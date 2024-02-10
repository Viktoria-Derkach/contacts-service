import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contacts, ContactsSchema } from './contacts.schema';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contacts.name)
    private readonly contactsModel: Model<Contacts>,
  ) {}

  async create(dto: CreateContactDto) {
   return this.contactsModel.create(dto);
  }

  async findById(id: string) {
    return this.contactsModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.contactsModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateContactDto) {
    return this.contactsModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
