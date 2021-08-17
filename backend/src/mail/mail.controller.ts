import { Controller, Post,Body } from '@nestjs/common';
import { MessageDto } from '../dto/message.dto';
import { MailService } from './mail.service';
import { Message } from '../interfaces/message.interface';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post()
    async create(@Body() messageDto: MessageDto): Promise<Message> {
        return this.mailService.sendClientMail(messageDto);
    }

}
