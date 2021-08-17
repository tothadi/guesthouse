import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { IntroductionDto } from './introduction.dto';
import { IntroductionService } from './introduction.service';
import { Introduction } from './introduction.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('introduction')
export class IntroductionController {
    constructor(private readonly introductionService: IntroductionService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
        async create(@Body() introductionDto: IntroductionDto) {
        return this.introductionService.create(introductionDto);
    }

    @Get()
        async findAll(): Promise<Introduction[]> {
        return this.introductionService.findAll();
    }

    @Get(':id')
        async find(@Param('id') id: string) {
        return this.introductionService.find(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
        async update(@Param('id') id: string, @Body() introductionDto: IntroductionDto) {
        return this.introductionService.update(id, introductionDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
        async delete(@Param('id') id: string, @Body() introductionDto: IntroductionDto) {
        return this.introductionService.delete(id, introductionDto);
    }
}