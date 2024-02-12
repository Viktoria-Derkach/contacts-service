import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
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

  update(noteId: string, note: any, updateNoteDto: any) {
    console.log(updateNoteDto, 'updateNoteDto');

    return this.notesModel
      .updateOne(
        { _id: noteId },

        { ...note, ...updateNoteDto, updated_at: new Date() },
        // { new: true },
      )
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
