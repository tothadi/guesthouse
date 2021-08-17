import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { GreetDto } from './greet.dto';
import { Greet } from './greet.interface';

@Injectable()
export class GreetService {

  constructor(@Inject('GREET_MODEL') private readonly greetModel: Model<Greet>) {}

  async create(greetDto: GreetDto): Promise<Greet> {
    const createdGreet = new this.greetModel(greetDto);
    return await createdGreet.save();
  }

  async findAll(): Promise<Greet[]> {
    return await this.greetModel.find().exec();
  }

  async find(id: string): Promise<Greet> {
    return await this.greetModel.findById(id).exec();
  }

  async update(id: string, GreetDto: GreetDto): Promise<Greet> {
    return await this.greetModel.findByIdAndUpdate(id, GreetDto);
  }

  async delete(id: string, GreetDto: GreetDto): Promise<Greet> {
    return await this.greetModel.findByIdAndRemove(id);
  }
}
