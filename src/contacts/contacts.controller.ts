import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { IdValidationPipe } from '../pipes/ad-validation.pipe';
import {
  CONTACT_ALREADY_EXISTS,
  CONTACT_NOT_FOUND_ERROR,
  EMAIL_IS_NOT_EDITABLE,
} from './contacts.constants';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateContactDto) {
    const exitContact = await this.contactsService.findByEmail(dto.email);

    if (exitContact) {
      throw new UnprocessableEntityException(CONTACT_ALREADY_EXISTS);
    }

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

  @HttpCode(204)
  @Put(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateContactDto,
  ) {
    const contact = await this.contactsService.findById(id);
    if (!contact) {
      throw new NotFoundException(CONTACT_NOT_FOUND_ERROR);
    }
    if (contact.email !== dto.email) {
      throw new UnprocessableEntityException(EMAIL_IS_NOT_EDITABLE);
    }
    const updatedContact = await this.contactsService.update(contact, dto);

    if (!updatedContact) {
      throw new NotFoundException(CONTACT_NOT_FOUND_ERROR);
    }
  }

  @Get()
  async getContacts(
    @Query('page') page: number,
    @Query('per_page') perPage: number,
    @Query('filters') filters: string,
  ): Promise<any> {
    // Parse the filters string to JSON
    const parsedFilters = JSON.parse(filters);
    console.log(filters, 'filters1');

    return this.contactsService.getContacts(page, perPage, filters);
  }
}
