import { Connection } from 'mongoose';
import { UsersSchema } from './auth.schemas';

export const authProviders = [
    {
        provide: 'USERS_MODEL',
        useFactory: (connection: Connection) => connection.model('Users', UsersSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];