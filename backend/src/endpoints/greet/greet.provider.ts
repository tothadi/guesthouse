import { Connection } from 'mongoose';
import { GreetSchema } from './greet.schemas';

export const greetProviders = [
   {
        provide: 'GREET_MODEL',
        useFactory: (connection: Connection) => connection.model('Greet', GreetSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
