import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ContactDto } from '../../dto/contact.dto';
import { ContactService } from './contact.service';
import { Contact } from '../../interfaces/contact.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
        async create(@Body() contactDto: ContactDto) {
        return this.contactService.create(contactDto);
    }
 
    @Get()
        async findAll(): Promise<Contact[]> {
        return this.contactService.findAll();
    }

    @Get(':id')
        async find(@Param('id') id: string) {
        return this.contactService.find(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
        async update(@Param('id') id: string, @Body() contactDto: ContactDto) {
        return this.contactService.update(id, contactDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
        async delete(@Param('id') id: string, @Body() contactDto: ContactDto) {
        return this.contactService.delete(id, contactDto);
    }
}
