import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  ValidationPipe,
  UsePipes,
  Put,
  HttpCode,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { ContactsService } from '../contacts/contacts.service';
import {
  CONTACT_NOT_FOUND_ERROR,
  NOTE_NOT_FOUND_ERROR,
} from './contacts.constants';
import { IdValidationPipe } from '../pipes/ad-validation.pipe';
import { ICollection } from './interfaces.notes';

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

  // @Get()
  // findAll() {
  //   return this.notesService.findAll();
  // }

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

  @HttpCode(204)
  @Delete(':noteId')
  async delete(
    @Param('contactId') contactId: string,
    @Param('noteId', IdValidationPipe) noteId: string,
  ) {
    const contact = await this.contactsService.findById(contactId);
    if (!contact) {
      throw new NotFoundException(CONTACT_NOT_FOUND_ERROR);
    }

    const note = await this.notesService.deleteById(noteId);

    if (!note) {
      throw new NotFoundException(NOTE_NOT_FOUND_ERROR);
    }
  }

  @Get()
  async getNotes(
    @Param('contactId') contactId: string,
    @Query('page') page: number,
    @Query('per_page') perPage: number,
    @Query('filters') filters: string,
  ) {
    try {
      const contact = await this.contactsService.findById(contactId);
      if (!contact) {
        throw new NotFoundException(CONTACT_NOT_FOUND_ERROR);
      }

      const parsedFilters = filters ? JSON.parse(filters) : [];

      const collection: ICollection = {};

      parsedFilters.forEach((el) => {
        if (Object.keys(el)[0] === 'id') {
          collection.ids = el.id.value;
        }
        if (Object.keys(el)[0] === 'created_at') {
          collection.created_at = el.created_at;
        }
      });

      return this.notesService.getNotes(page, perPage, collection);
    } catch (error) {
      console.error(error);
    }
  }
}
