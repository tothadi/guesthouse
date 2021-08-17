import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IpnDto, OccupationDto, ReservationDto } from '../../dto/reservation.dto';
import { IPN, Occupation, Reservation } from '../../interfaces/reservation.interface';
import { InvoiceService } from './invoice.service';
import { MailService } from '../../mail/mail.service';
import { isError } from 'util';

@Injectable()
export class ReservationService {

  constructor(
    @Inject('RESERVATION_MODEL') private readonly reservationModel: Model<Reservation>,
    @Inject('OCCUPATION_MODEL') private readonly occupationModel: Model<Occupation>,
    private invoiceService: InvoiceService,
    private mailService: MailService
  ) { }

  // Helper to create dates for adding pre-occupied dates
  async calcOccupations(start: Date, end: Date): Promise<OccupationDto> {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return new this.occupationModel({ dates: arr });
  }

  // Check if reservation dates are overlapping previous reservation
  async isOccupied(reqDates: Date[]): Promise<boolean> {
    const
      oldDates = (await this.findOccupations())
        .dates,
      oldDatesAsc = oldDates
        .map(d => d.getTime())
        .sort((a, b) => a - b),
      oldDatesDesc = oldDates
        .map(d => d.getTime())
        .sort((a, b) => b - a),
      newDates = reqDates
        .map(d => d.getTime()),
      isOccupied = newDates.some(d => (d >= oldDatesAsc[0] && d < oldDatesDesc[0]));

    return isOccupied;
  }

  // Create a new reservation in the database, if all data needed are present and proform invoice issued
  async create(reservationDto: ReservationDto): Promise<Reservation> {
    const
      createdReservation = new this.reservationModel(reservationDto),
      newOccupations: OccupationDto = await this.calcOccupations(reservationDto.arrivalAt, reservationDto.leaveAt),
      isOccupied = await this.isOccupied(newOccupations.dates);

    if (isOccupied) {
      throw new Error('occupied');
    } else {
      const proformResponse = await this.invoiceService.createInvoice(createdReservation, true);

      proformResponse.success
        ? createdReservation.$set('paymentProformNumber', proformResponse.data)
        : createdReservation.$set('paymentProformNumber', `ERROR: ${proformResponse.data}`);

      const reservationStatus = await createdReservation.save();

      if (reservationStatus.name) {
        await this.mailService.sendNewResNotification(createdReservation, proformResponse.success);
        await this.updateOccupation(newOccupations);
      }
      return reservationStatus;
    }
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationModel.find().exec();
  }

  // All occupations are held in one document
  async findOccupations(): Promise<Occupation> {
    return await this.occupationModel.findById('60b6592852f2ae3849bb201b').exec();
  }

  async find(id: string): Promise<Reservation> {
    return await this.reservationModel.findById(id).exec();
  }

  async update(id: string, ReservationDto: ReservationDto): Promise<Reservation> {
    return await this.reservationModel.findByIdAndUpdate(id, ReservationDto);
  }

  // Add new occupations to database
  async updateOccupation(occupationDto: OccupationDto): Promise<Occupation> {
    return await this.occupationModel.findByIdAndUpdate('60b6592852f2ae3849bb201b', { $addToSet: { dates: { $each: occupationDto.dates } } });
  }

  // Update the payment info of a reservation, on szamlazz.hu notification, and issue final invoice
  async updatePayment(ipnDto: IpnDto): Promise<IPN> {

    const
      now = new Date(),
      reservation = await this.reservationModel.findById(ipnDto.szlahu_rendelesszam).exec(),
      invoiceResponse = await this.invoiceService.createInvoice(reservation, false),
      updated = await this.reservationModel.findByIdAndUpdate(ipnDto.szlahu_rendelesszam, {
        $set: {
          paymentFulfilled: true,
          paymentMethod: ipnDto.szlahu_fizetesmod
        },
        paymentPaidAt: now,
        paymentInvoiceNumber: invoiceResponse.success ? invoiceResponse.data : `ERROR: ${invoiceResponse.data}`
      });
    await this.mailService.sendPaymentNotification(updated, invoiceResponse.success);
    return ipnDto;
  }

  async delete(id: string, ReservationDto: ReservationDto): Promise<Reservation> {
    return await this.reservationModel.findByIdAndRemove(id);
  }
}