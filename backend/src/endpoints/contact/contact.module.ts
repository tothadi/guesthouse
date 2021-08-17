import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { contactProviders } from '../../database/providers/contact.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ContactController],
    providers: [ContactService, ...contactProviders],
})
export class ContactModule {}
