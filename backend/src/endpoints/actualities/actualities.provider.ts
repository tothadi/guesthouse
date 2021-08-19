import { Connection } from 'mongoose';
import { ActualitiesSchema } from './actualities.schemas';

export const actualitiesProviders = [
    {
        provide: 'ACTUALITIES_MODEL',
        useFactory: (connection: Connection) => connection.model('Actualities', ActualitiesSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];