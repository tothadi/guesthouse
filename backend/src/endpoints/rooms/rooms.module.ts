import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { roomsProviders } from './rooms.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [RoomsController],
    providers: [RoomsService, ...roomsProviders],
})
export class RoomsModule {}
