import { Controller, Get, Post, Put, Delete, Body, Param, UseFilters, UseGuards, Inject, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IpnDto, OccupationDto, ReservationDto } from '../../dto/reservation.dto';
import { ReservationService } from './reservation.service';
import { IPN, Occupation, Reservation } from '../../interfaces/reservation.interface';
import { BadRequestFilter, MongoExceptionFilter } from '../../database/exception.filter'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('reservation')
export class ReservationController {

    constructor(
        private readonly reservationService: ReservationService,
        private readonly configService: ConfigService
    ) {

    }

    // Reservation from clients
    @Post()
    @UseFilters(BadRequestFilter, MongoExceptionFilter)
    async create(@Body() reservationDto: ReservationDto): Promise<any> {
        return await this.reservationService.create(reservationDto);
    }

    // Payment notification from szamlazz.hu
    @Post(':ipnuri')
    async processPayment(@Param('ipnuri') ipnUri: string, @Body() ipnDto: IpnDto): Promise<IPN> {
        if (ipnUri === this.configService.get<string>('IPN_URI')) {
            return await this.reservationService.updatePayment(ipnDto);
        }
    }

    // Occupied dates for clientside
    @Get()
    async findOccupations(): Promise<Occupation> {
        return this.reservationService.findOccupations();
    }

    // Client can check reservation status if knows order number
    @Get(':id')
    async find(@Param('id') id: string) {
        return this.reservationService.find(id);
    }

    // Add pre-occupied dates from admin panel
    @UseGuards(JwtAuthGuard)
    @Post('occupation')
    @UseFilters(BadRequestFilter, MongoExceptionFilter)
    async createByAdmin(@Body() occupationDto: OccupationDto): Promise<any> {
        return await this.reservationService.updateOccupation(occupationDto);
    }

    // Get all data of all reservations for admin purposes
    @UseGuards(JwtAuthGuard)
    @Get('reservations')
    async findAll(): Promise<Reservation[]> {
        return this.reservationService.findAll();
    }

    // Modify a reservation from admin panel
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() reservationDto: ReservationDto) {
        return this.reservationService.update(id, reservationDto);
    }

    // Delete a reservation from admin panel
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string, @Body() reservationDto: ReservationDto) {
        return this.reservationService.delete(id, reservationDto);
    }
}