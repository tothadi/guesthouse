import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { ActualitiesSchema } from '../endpoints/actualities/actualities.schemas';
import { ContactSchema } from '../endpoints/contact/contact.schemas';
import { GreetSchema } from '../endpoints/greet/greet.schemas';
import { PicturesSchema } from '../endpoints/rooms/rooms.schemas';
import { OccupationSchema, ReservationSchema } from '../endpoints/reservations/reservation.schemas';
import { RoomsSchema } from '../endpoints/rooms/rooms.schemas';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>
        await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, }),
    },
    {
        provide: 'ACTUALITIES_MODEL',
        useFactory: (connection: Connection) => connection.model('Actualities', ActualitiesSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'CONTACT_MODEL',
        useFactory: (connection: Connection) => connection.model('Contact', ContactSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'GREET_MODEL',
        useFactory: (connection: Connection) => connection.model('Greet', GreetSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'PICTURES_MODEL',
        useFactory: (connection: Connection) => connection.model('Pictures', PicturesSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'RESERVATION_MODEL',
        useFactory: (connection: Connection) => connection.model('Reservation', ReservationSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'OCCUPATION_MODEL',
        useFactory: (connection: Connection) => connection.model('Occupation', OccupationSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'ROOMS_MODEL',
        useFactory: (connection: Connection) => connection.model('Rooms', RoomsSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];