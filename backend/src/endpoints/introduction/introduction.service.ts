import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IntroductionDto } from './introduction.dto';
import { Introduction } from './introduction.interface';

@Injectable()
export class IntroductionService {

  constructor(@Inject('INTRODUCTION_MODEL') private readonly introductionModel: Model<Introduction>) {}

  async create(introductionDto: IntroductionDto): Promise<Introduction> {
    const createdIntroduction = new this.introductionModel(introductionDto);
    return await createdIntroduction.save();
  }

  async findAll(): Promise<Introduction[]> {
    return await this.introductionModel.find().exec();
  }

  async find(id: string): Promise<Introduction> {
    return await this.introductionModel.findById(id).exec();
  }

  async update(id: string, IntroductionDto: IntroductionDto): Promise<Introduction> {
    return await this.introductionModel.findByIdAndUpdate(id, IntroductionDto);
  }

  async delete(id: string, IntroductionDto: IntroductionDto): Promise<Introduction> {
    return await this.introductionModel.findByIdAndRemove(id);
  }
}