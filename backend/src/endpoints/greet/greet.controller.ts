import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GreetDto } from '../../dto/greet.dto';
import { GreetService } from './greet.service';
import { Greet } from '../../interfaces/greet.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('greet')
export class GreetController {
    constructor(private readonly greetService: GreetService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
        async create(@Body() greetDto: GreetDto) {
        return this.greetService.create(greetDto);
    }
 
    @Get()
        async findAll(): Promise<Greet[]> {
        return this.greetService.findAll();
    }

    @Get(':id')
        async find(@Param('id') id: string) {
        return this.greetService.find(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
        async update(@Param('id') id: string, @Body() greetDto: GreetDto) {
        return this.greetService.update(id, greetDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
        async delete(@Param('id') id: string, @Body() greetDto: GreetDto) {
        return this.greetService.delete(id, greetDto);
    }
}
