import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ActualitiesController } from './actualities.controller';
import { ActualitiesService } from './actualities.service';
import { actualitiesProviders } from './actualities.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        DatabaseModule,
        AuthModule
    ],
    controllers: [ActualitiesController],
    providers: [ActualitiesService, ...actualitiesProviders],
})
export class ActualitiesModule {}