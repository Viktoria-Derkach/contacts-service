import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { ContactsModule } from '../contacts/contacts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Notes, NotesSchema } from './entities/note.entity';

@Module({
  controllers: [NotesController],
  imports: [
    MongooseModule.forFeature([{ name: Notes.name, schema: NotesSchema }]),
    ContactsModule,
  ],
  providers: [NotesService],
})
export class NotesModule {}
