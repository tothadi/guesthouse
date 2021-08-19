import { Controller, Post,Body, UseGuards } from '@nestjs/common';
import { MessageDto } from './message.dto';
import { MailService } from './mail.service';
import { Message } from './message.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() messageDto: MessageDto): Promise<Message> {
        return this.mailService.sendClientMail(messageDto);
    }

}
