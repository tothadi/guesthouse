import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { resolve, extname } from 'path';
import * as fs from 'fs';
import { Model, ObjectId } from 'mongoose';
import { GalleriesDto, PicturesDto } from './galleries.dto';
import { Galleries } from './galleries.interface';
import { FilesMapper } from './interface/filemapper.interface'
import { ConfigService } from '@nestjs/config';

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};


@Injectable()
export class GalleriesService {

  constructor(
    @Inject('GALLERIES_MODEL') private readonly galleriesModel: Model<Galleries>,
    private configService: ConfigService,
  ) { }

  async create(galleriesDto: GalleriesDto): Promise<Galleries> {
    const
      createdGallery = new this.galleriesModel(galleriesDto),
      galleryPath = `${this.configService.get<string>('GALLERY_FOLDER')}/${createdGallery.folder}`;
    !fs.existsSync(resolve(galleryPath)) ? fs.mkdirSync(resolve(galleryPath)) : console.log('existing gallery');
    return await createdGallery.save();
  }

  async findAll(): Promise<Galleries[]> {
    return await this.galleriesModel.find().exec();
  }

  async find(id: string): Promise<Galleries> {
    return await this.galleriesModel.findById(id).exec();
  }

  async update(id: string, galleriesDto: GalleriesDto): Promise<Galleries> {
    return await this.galleriesModel.findByIdAndUpdate(id, galleriesDto);
  }

  async addPic(folder: string, picture: PicturesDto): Promise<Galleries> {
    return await this.galleriesModel.findOneAndUpdate({ folder: folder }, { $addToSet: { pics: picture } })
  }

  async updatePicCaption(id: ObjectId, picId: ObjectId, picture: PicturesDto): Promise<Galleries> {
    return await this.galleriesModel.findByIdAndUpdate(
      id,
      {
        $set: {
          text: 'csak szöveg',
          'pics.$[pic].caption': picture.caption,

        }
      },
      {
        arrayFilters: [
          {
            'pic._id': picId
          }
        ]
      }
    )
  }

  async removePicCaption(id: ObjectId, picId: ObjectId): Promise<Galleries> {
    return await this.galleriesModel.findByIdAndUpdate(
      id,
      {
        $unset: {
          'pics.$[pic].caption': ''
        }
      },
      {
        arrayFilters: [
          {
            'pic._id': picId
          }
        ]
      }
    )
  }

  async deletePic(id: ObjectId, picId: ObjectId): Promise<Galleries> {
    // kép törlése a szerverről
    return await this.galleriesModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          pics: { _id: picId }
        }
      })
  }

  async delete(id: string, GalleriesDto: GalleriesDto): Promise<Galleries> {
    //galéria folder törlése
    return await this.galleriesModel.findByIdAndRemove(id);
  }

  editFileName(
    req: Request,
    file: Express.Multer.File,
    callback
  ) {
    const fileExtName = extname(file.originalname);
    const randomName = Array(12)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    callback(null, `${randomName}${fileExtName}`);
  }

  editDestination(
    req: Request,
    file: Express.Multer.File,
    cb
  ) {
    const
      folder = req.headers['gallery-name'],
      galleryPath = resolve(`${this.configService.get<string>('GALLERY_FOLDER')}/${folder}`); //
    cb(null, galleryPath)
  }

  filesMapper({ files, req }: FilesMapper) {
    return files.map(file => {
      const
        image_url = `${req.protocol}://${req.headers.host}/${file.path}`,
        folderNameStartPos = file.destination.lastIndexOf('/') + 1,
        folderName = file.destination.substr(folderNameStartPos);

      this.addPic(folderName, { filename: file.filename })
      return {
        folderName,
        originalname: file.originalname,
        filename: file.filename,
        image_url,
      };
    });
  };
}