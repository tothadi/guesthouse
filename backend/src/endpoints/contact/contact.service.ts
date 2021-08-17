import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ContactDto } from '../../dto/contact.dto';
import { Contact } from '../../interfaces/contact.interface';

@Injectable()
export class ContactService {

  constructor(@Inject('CONTACT_MODEL') private readonly contactModel: Model<Contact>) {}

  async create(contactDto: ContactDto): Promise<Contact> {
    const createdContact = new this.contactModel(contactDto);
    return await createdContact.save();
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactModel.find().exec();
  }

  async find(id: string): Promise<Contact> {
    return await this.contactModel.findById(id).exec();
  }

  async update(id: string, ContactDto: ContactDto): Promise<Contact> {
    return await this.contactModel.findByIdAndUpdate(id, ContactDto);
  }

  async delete(id: string, ContactDto: ContactDto): Promise<Contact> {
    return await this.contactModel.findByIdAndRemove(id);
  }
}
