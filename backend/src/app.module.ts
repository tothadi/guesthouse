import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoExceptionFilter } from './database/exception.filter'

import { ActualitiesModule } from './endpoints/actualities/actualities.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './endpoints/contact/contact.module';
import { GalleriesModule } from './endpoints/galleries/galleries.module';
import { GreetModule } from './endpoints/greet/greet.module';
import { IntroductionModule } from './endpoints/introduction/introduction.module';
import { ReservationModule } from './endpoints/reservations/reservation.module';
import { MailModule } from './endpoints/messaging/mail.module';

@Module({
  imports: [
    ActualitiesModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: `.env.local` }),
    ContactModule,
    GalleriesModule,
    GreetModule,
    IntroductionModule,
    ReservationModule,
    MailModule,
  ],
  controllers: [],
  providers: [MongoExceptionFilter],
})
export class AppModule { }
