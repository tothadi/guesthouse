import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RoomsDto } from './rooms.dto';
import { Rooms } from './rooms.interface';

@Injectable()
export class RoomsService {

  constructor(@Inject('ROOMS_MODEL') private readonly roomsModel: Model<Rooms>) {}

  async create(roomsDto: RoomsDto): Promise<Rooms> {
    const createdRooms = new this.roomsModel(roomsDto);
    return await createdRooms.save();
  }

  async findAll(): Promise<Rooms[]> {
    return await this.roomsModel.find().sort({order: 1}).exec();
  }

  async find(id: string): Promise<Rooms> {
    return await this.roomsModel.findById(id).exec();
  }

  async update(id: string, RoomsDto: RoomsDto): Promise<Rooms> {
    return await this.roomsModel.findByIdAndUpdate(id, RoomsDto);
  }

  async delete(id: string, RoomsDto: RoomsDto): Promise<Rooms> {
    return await this.roomsModel.findByIdAndRemove(id);
  }
}
