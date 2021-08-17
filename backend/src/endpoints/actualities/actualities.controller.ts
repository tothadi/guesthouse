import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ActualitiesDto } from './actualities.dto';
import { ActualitiesService } from './actualities.service';
import { Actualities } from './actualities.interface';

@Controller('actualities')
export class ActualitiesController {
    constructor(private readonly actualitiesService: ActualitiesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
        async create(
            @Body() actualitiesDto: ActualitiesDto,
            @Req() req: any
        ) {
            //console.log(req.headers)
        return this.actualitiesService.create(actualitiesDto);
    }

    @Get()
        async findAll(): Promise<Actualities[]> {
        return this.actualitiesService.findAll();
    }

    @Get(':id')
        async find(@Param('id') id: string) {
        return this.actualitiesService.find(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
        async update(@Param('id') id: string, @Body() actualitiesDto: ActualitiesDto) {
        return this.actualitiesService.update(id, actualitiesDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
        async delete(@Param('id') id: string, @Body() actualitiesDto: ActualitiesDto) {
        return this.actualitiesService.delete(id, actualitiesDto);
    }
}