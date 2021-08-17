import { Connection } from 'mongoose';
import { IntroductionSchema } from '../schemas/introduction.schemas';

export const introductionProviders = [
    {
        provide: 'INTRODUCTION_MODEL',
        useFactory: (connection: Connection) => connection.model('Introduction', IntroductionSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];