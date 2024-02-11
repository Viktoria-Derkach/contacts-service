import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contacts } from './contacts.schema';
import { Model, Types } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contacts.name)
    private readonly contactsModel: Model<Contacts>,
  ) {}

  async create(dto: CreateContactDto) {
    return this.contactsModel.create({
      ...dto,
      meta: {
        created_at: new Date(),
        interacted_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async findById(id: string) {
    return this.contactsModel.findById(id).exec();
  }

  async findByEmail(email: string) {
    return this.contactsModel.findOne({ email }).exec();
  }

  async deleteById(id: string) {
    return this.contactsModel.findByIdAndDelete(id).exec();
  }

  async update(
    contact: Contacts & {
      _id: Types.ObjectId;
    },
    dto: CreateContactDto,
  ) {
    return this.contactsModel
      .updateOne(
        { _id: contact._id },
        {
          ...dto,
          meta: {
            ...contact.meta,
            interacted_at: new Date(),
            updated_at: new Date(),
          },
        },
      )
      .exec();
  }

  async getContacts(page: number, perPage: number, filters: any): Promise<any> {
    console.log(filters, 'filters');

    const contacts = await this.contactsModel
      .find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ 'meta.interacted_at': -1 })
      .exec();

    const total = await this.contactsModel.countDocuments(filters);

    return {
      data: contacts,
      meta: {
        pagination: {
          total,
          count: contacts.length,
          per_page: perPage,
          current_page: page,
          total_pages: Math.ceil(total / perPage),
          links: [],
        },
      },
    };
  }
}
