import { Module } from '@nestjs/common';
import { GreetController } from './greet.controller';
import { GreetService } from './greet.service';
import { greetProviders } from '../../database/providers/greet.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [GreetController],
    providers: [GreetService, ...greetProviders],
})
export class GreetModule {}
