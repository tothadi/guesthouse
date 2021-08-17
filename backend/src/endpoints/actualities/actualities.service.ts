import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ActualitiesDto } from './actualities.dto';
import { Actualities } from './actualities.interface';

@Injectable()
export class ActualitiesService {

  constructor(@Inject('ACTUALITIES_MODEL') private readonly actualitiesModel: Model<Actualities>) {}

  async create(actualitiesDto: ActualitiesDto): Promise<Actualities> {
    const createdActualities = new this.actualitiesModel(actualitiesDto);
    return await createdActualities.save();
  }

  async findAll(): Promise<Actualities[]> {
    return await this.actualitiesModel.find().exec();
  }

  async find(id: string): Promise<Actualities> {
    return await this.actualitiesModel.findById(id).exec();
  }

  async update(id: string, ActualitiesDto: ActualitiesDto): Promise<Actualities> {
    return await this.actualitiesModel.findByIdAndUpdate(id, ActualitiesDto);
  }

  async delete(id: string, ActualitiesDto: ActualitiesDto): Promise<Actualities> {
    return await this.actualitiesModel.findByIdAndRemove(id);
  }
}