import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateContactDto) {
    return this.contactsService.create(dto);
  }
}
