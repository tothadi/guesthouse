import { Connection } from 'mongoose';
import { RoomsSchema } from './rooms.schemas';

export const roomsProviders = [
   {
        provide: 'ROOMS_MODEL',
        useFactory: (connection: Connection) => connection.model('Rooms', RoomsSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
