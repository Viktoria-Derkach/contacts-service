import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateNoteDto } from './dto/create-note.dto';
import { Notes } from './entities/note.entity';

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

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
