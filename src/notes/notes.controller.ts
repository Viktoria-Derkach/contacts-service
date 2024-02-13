import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ValidationPipe,
  UsePipes,
  Put,
  HttpCode,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ContactsService } from '../contacts/contacts.service';
import {
  CONTACT_NOT_FOUND_ERROR,
  NOTE_NOT_FOUND_ERROR,
} from './contacts.constants';

@Controller('contacts/:contactId/notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly contactsService: ContactsService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(
    @Param('contactId') contactId: string,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    const contact = await this.contactsService.findById(contactId);

    if (!contact) {
      throw new NotFoundException(CONTACT_NOT_FOUND_ERROR);
    }
    const note = await this.notesService.create({
      ...createNoteDto,
      email: contact.email,
    });
    return {
      data: {
        id: note._id,
      },
    };
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @HttpCode(204)
  @Put(':noteId')
  async update(
    @Param('contactId') contactId: string,
    @Param('noteId') noteId: string,
    @Body() updateNoteDto: CreateNoteDto,
  ) {
    const note = await this.notesService.findById(noteId);
    const contact = await this.contactsService.findById(contactId);

    if (!contact) {
      throw new NotFoundException(CONTACT_NOT_FOUND_ERROR);
    }

    if (!note) {
      throw new NotFoundException(NOTE_NOT_FOUND_ERROR);
    }

    await this.notesService.update(note, updateNoteDto);
  }

  @Delete(':contactId')
  remove(@Param('contactId') contactId: string) {
    return this.notesService.remove(+contactId);
  }
}
