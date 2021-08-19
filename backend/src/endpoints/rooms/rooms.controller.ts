import { Controller, Get, Put, Delete, Body, Param, UseGuards, Patch } from '@nestjs/common';
import { RoomsDto } from './rooms.dto';
import { RoomsService } from './rooms.service';
import { Rooms } from './rooms.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @UseGuards(JwtAuthGuard)
    @Put()
        async create(@Body() roomsDto: RoomsDto) {
        return this.roomsService.create(roomsDto);
    }
 
    @Get()
        async findAll(): Promise<Rooms[]> {
        return this.roomsService.findAll();
    }

    // @Get(':id')
    //     async find(@Param('id') id: string) {
    //     return this.roomsService.find(id);
    // }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
        async update(@Param('id') id: string, @Body() roomsDto: RoomsDto) {
        return this.roomsService.update(id, roomsDto);
    }

    // @UseGuards(JwtAuthGuard)
    // @Delete(':id')
    //     async delete(@Param('id') id: string, @Body() roomsDto: RoomsDto) {
    //     return this.roomsService.delete(id, roomsDto);
    // }
}
