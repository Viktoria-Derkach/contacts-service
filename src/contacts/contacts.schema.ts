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
  job_title: string;
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
  zip_code: string;
}

export class MetaSchema {
  @Prop()
  created_at: number;

  @Prop()
  interacted_at: number;

  @Prop()
  updated_at: number;
}

@Schema()
export class Contacts {
  @Prop()
  email: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  description: string;

  @Prop()
  phone: PhoneSchema;

  @Prop()
  company: CompanySchema;

  @Prop()
  address: AddressSchema;

  @Prop()
  meta: MetaSchema;
}

export const ContactsSchema = SchemaFactory.createForClass(Contacts);
