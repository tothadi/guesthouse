import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    OnModuleInit
} from '@nestjs/common';
import * as fs from "fs";
import { ApiConsumes } from '@nestjs/swagger';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { FastifyFilesInterceptor } from './interceptor/files.interceptor';
import { MultipleFileDto } from './dto/files.dto';
import { GalleriesDto, PicturesDto } from './galleries.dto';
import { GalleriesService } from './galleries.service';
import { Galleries } from './galleries.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ObjectId } from 'mongoose';

@Controller('galleries')

export class GalleriesController {


    constructor(private readonly galleriesService: GalleriesService) { }

    /*@ApiConsumes('multipart/form-data')
    @Post('single-file')
    @UseInterceptors(

        FastifyFileInterceptor('photo_url', {
            storage: diskStorage({
                destination: '../../assets/gallery',
                //filename: this.galleriesService.editFileName(),
            }),
            //fileFilter: this.galleriesService.imageFileFilter(),
        }),
    )
    single(
        @Req() req: Request,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: SingleFileDto,
    ) {
        return { ...body, photo_url: this.galleriesService.fileMapper({ file, req }) };
    }
*/

    //@UseGuards(JwtAuthGuard)
    @ApiConsumes('multipart/form-data')
    @Post('pic')
    @UseInterceptors(
        FastifyFilesInterceptor('photo')
    )
    multiple(
        @Req() req: Request,
        @UploadedFiles() files: Express.Multer.File[],
        @Body() body: MultipleFileDto,
    ) {

        return { ...body, photo_url: this.galleriesService.filesMapper({ files, req }) };
    }

    //@UseGuards(JwtAuthGuard)
    @Post('newgallery')
    async create(@Body() galleriesDto: GalleriesDto) {
        return this.galleriesService.create(galleriesDto);
    }

    @Get()
    async findAll(): Promise<Galleries[]> {
        return this.galleriesService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return this.galleriesService.find(id);
    }

    @UseGuards(JwtAuthGuard) // update infromation of gallery
    @Put(':id')
    async update(@Param('id') id: string, @Body() galleriesDto: GalleriesDto) {
        return this.galleriesService.update(id, galleriesDto);
    }

    //@UseGuards(JwtAuthGuard) // update caption of a picture
    @Put('caption/:id/:picid')
    async updatePic(
        @Param('id') id: ObjectId, //galleryID
        @Param('picid') picId: ObjectId, //picID
        @Body() picture: PicturesDto
    ) {
        return this.galleriesService.updatePicCaption(id, picId, picture);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string, @Body() galleriesDto: GalleriesDto) {
        return this.galleriesService.delete(id, galleriesDto);
    }

    @Delete(':id/:picid')
    async deletePic(
        @Param('id') id: ObjectId, //galleryID
        @Param('picid') picId: ObjectId, //picID
    ) {
        return this.galleriesService.deletePic(id, picId);
    }

    @Delete('picid/:id/:picid')
    async deletePicCaption(
        @Param('id') id: ObjectId, //galleryID
        @Param('picid') picId: ObjectId, //picID
    ) {
        return this.galleriesService.removePicCaption(id, picId);
    }

}