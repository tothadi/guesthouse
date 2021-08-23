import { Module, } from "@nestjs/common";
//import { ConfigModule } from '@nestjs/config';
import { MongoExceptionFilter, NotFoundExceptionFilter } from "./exception.filter";

import { ActualitiesModule } from "./endpoints/actualities/actualities.module";
import { AuthModule } from "./auth/auth.module";
import { ContactModule } from "./endpoints/contact/contact.module";
import { GreetModule } from "./endpoints/greet/greet.module";
import { ReservationModule } from "./endpoints/reservations/reservation.module";
import { MailModule } from "./endpoints/messaging/mail.module";
import { RoomsModule } from "./endpoints/rooms/rooms.module";

@Module({
  imports: [
    ActualitiesModule,
    AuthModule,
    //ConfigModule.forRoot({ envFilePath: `.env.local` }),
    ContactModule,
    GreetModule,
    ReservationModule,
    RoomsModule,
    MailModule,
  ],
  controllers: [],
  providers: [
    MongoExceptionFilter,
    NotFoundExceptionFilter,
  ]
})
export class AppModule {
}
