import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../database/database.module';
import { MailModule } from 'src/endpoints/messaging/mail.module';
import { reservationProviders } from '../../database/providers/reservation.provider';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { InvoiceService } from './invoice.service';
import { XmlService } from './xml.service';

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        HttpModule,
        MailModule,
    ],
    controllers: [
        ReservationController,
    ],
    providers: [
        InvoiceService,
        ReservationService,
        ...reservationProviders,
        XmlService,
    ],
})
export class ReservationModule { }