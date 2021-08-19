import { Connection } from 'mongoose';
import { ContactSchema } from './contact.schemas';

export const contactProviders = [
   {
        provide: 'CONTACT_MODEL',
        useFactory: (connection: Connection) => connection.model('Contact', ContactSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
