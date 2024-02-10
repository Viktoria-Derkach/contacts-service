import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { IdValidationPipe } from '../pipes/ad-validation.pipe';
import { CONTACT_NOT_FOUND_ERROR } from './contacts.constants';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateContactDto) {
    const contact = await this.contactsService.create(dto);
    return {
      data: {
        id: contact._id,
      },
    };
  }

  @Get(':id')
  async getById(@Param('id', IdValidationPipe) id: string) {
    const contact = await this.contactsService.findById(id);
    if (!contact) {
      throw new NotFoundException(CONTACT_NOT_FOUND_ERROR);
    }

    return contact;
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const contact = await this.contactsService.deleteById(id);
    if (!contact) {
      throw new NotFoundException(CONTACT_NOT_FOUND_ERROR);
    }
  }
}
