import { Connection } from 'mongoose';
import { GalleriesSchema } from './galleries.schemas';

export const galleriesProviders = [
    {
        provide: 'GALLERIES_MODEL',
        useFactory: (connection: Connection) => connection.model('Galleries', GalleriesSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];