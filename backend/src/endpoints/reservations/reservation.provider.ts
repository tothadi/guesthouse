import { Connection } from 'mongoose';
import { OccupationSchema, ReservationSchema } from './reservation.schemas';

export const reservationProviders = [
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
];