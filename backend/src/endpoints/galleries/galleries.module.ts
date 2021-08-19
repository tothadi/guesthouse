import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
//import { ConfigModule, ConfigService } from '@nestjs/config';
import { GalleriesController } from './galleries.controller';
import { GalleriesService } from './galleries.service';
import { galleriesProviders } from './galleries.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [
        //ConfigModule,
        DatabaseModule,
        MulterModule
    ],
    controllers: [GalleriesController],
    providers: [GalleriesService, ...galleriesProviders],
})
export class GalleriesModule { }