import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateNoteDto } from './dto/create-note.dto';
import { Notes } from './entities/note.entity';
import { getCreatedAtValue } from './utils';
import { ICollection } from './interfaces.notes';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Notes.name)
    private readonly notesModel: Model<Notes>,
  ) {}

  async create(dto: CreateNoteDto & { email: string }) {
    return this.notesModel.create({
      ...dto,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  findAll() {
    return `This action returns all notes`;
  }

  findById(noteId: string) {
    return this.notesModel.findById(noteId).exec();
  }

  async getNotes(
    page: number,
    perPage: number,
    collection: ICollection,
  ): Promise<any> {
    const ids = collection?.ids ? { _id: { $in: collection.ids } } : {};
    const createdAt = getCreatedAtValue(collection?.created_at);

    const notes = await this.notesModel
      .find({ ...ids, ...createdAt })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ created_at: -1 })
      .exec();

    // const total = await this.notesModel.countDocuments(filters);

    return {
      data: notes,
      meta: {
        pagination: {
          // total,
          count: notes.length,
          per_page: perPage,
          current_page: page,
          // total_pages: Math.ceil(total / perPage),
          links: [],
        },
      },
    };
  }

  update(
    note: CreateNoteDto & {
      email: string;
      created_at: number;
      _id: Types.ObjectId;
    },
    updateNoteDto: CreateNoteDto,
  ) {
    return this.notesModel
      .updateOne(
        { _id: note._id },
        {
          ...updateNoteDto,
          created_at: note.created_at,
          email: note.email,
          updated_at: new Date(),
        },
      )
      .exec();
  }

  deleteById(id: string) {
    return this.notesModel.findByIdAndDelete(id).exec();
  }
}
