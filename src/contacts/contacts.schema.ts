import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class PhoneSchema {
  @Prop()
  number: string;

  @Prop()
  countryCode: string;
}

export class CompanySchema {
  @Prop()
  name: string;

  @Prop()
  jobTitle: string;
}

export class AddressSchema {
  @Prop()
  country: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  apartment: string;

  @Prop()
  zipCode: string;
}

@Schema()
export class Contacts {
  email: string;
  firstName: string;
  lastName: string;
  description: string;
  phone: PhoneSchema;
  company: CompanySchema;
  address: AddressSchema;
}

export const ContactsSchema = SchemaFactory.createForClass(Contacts);
