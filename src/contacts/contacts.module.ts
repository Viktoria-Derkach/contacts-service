import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { Contacts, ContactsSchema } from './contacts.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ContactsController],
  imports: [
    MongooseModule.forFeature([
      { name: Contacts.name, schema: ContactsSchema },
    ]),
  ],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class ContactsModule {}
