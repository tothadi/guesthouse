import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageDto } from 'src/dto/message.dto';
import { Reservation } from 'src/interfaces/reservation.interface';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService
  ) { }

  async sendClientMail(messageDto: MessageDto): Promise<any> {
    return await this.mailerService.sendMail({
      to: this.configService.get<string>('MAILER_EMAIL'),
      from: { address: messageDto.email, name: messageDto.name },
      replyTo: messageDto.email,
      subject: `Vendégház - ${messageDto.subject} tárgyú, új üzenet érkezett`,
      template: './clientmail',
      context: {
        name: messageDto.name,
        phone: messageDto.phone,
        email: messageDto.email,
        subject: messageDto.subject,
        text: messageDto.text,
      },
    });
  }

  async sendNewResNotification(reservationData: Reservation, proformOK: boolean): Promise<any> {
    return await this.mailerService.sendMail({
      to: this.configService.get<string>('MAILER_EMAIL'),
      subject: `Vendégház - Új foglalás érkezett ${reservationData.arrivalAt.toLocaleDateString('hu-HU')} érkezéssel`,
      template: './newreservation',
      context: {
        id: reservationData._id,
        name: reservationData.name,
        address: `${reservationData.zip} ${reservationData.city}, ${reservationData.street} ${reservationData.addressMisc ? reservationData.address + ', ' + reservationData.addressMisc : reservationData.address}`,
        phone: reservationData.phone,
        email: reservationData.email,
        adults: reservationData.adults,
        arrival: reservationData.arrivalAt.toLocaleDateString('hu-HU'),
        leave: reservationData.leaveAt.toLocaleDateString('hu-HU'),
        proform: proformOK ? 'megtörtént' : 'nem sikerült'
      },
    });
  }

  async sendPaymentNotification(reservationData: Reservation, invoiceOK: boolean): Promise<any> {
    return await this.mailerService.sendMail({
      to: this.configService.get<string>('MAILER_EMAIL'),
      subject: `Vendégház - A ${reservationData._id} számú foglalás kifizetésre került`,
      template: './payment',
      context: {
        id: reservationData._id,
        name: reservationData.name,
        address: `${reservationData.zip} ${reservationData.city}, ${reservationData.street} ${reservationData.addressMisc ? reservationData.address + ', ' + reservationData.addressMisc : reservationData.address}`,
        phone: reservationData.phone,
        email: reservationData.email,
        invoiceNum: reservationData.paymentInvoiceNumber,
        invoice: invoiceOK ? 'megtörtént' : 'nem sikerült'
      },
    });
  }
}
