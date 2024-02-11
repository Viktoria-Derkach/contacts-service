import { Type } from 'class-transformer';
import {
  IsEmail,
  IsISO31661Alpha2,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { NoEmojis } from '../../validators/NoEmoji.validator';
import { CountryRequiredWithZipCode } from '../../validators/CountryRequiredWithZipCode.validator';
import { InvalidDomain } from '../../validators/InvalidDomain.validator';

class PhoneDto {
  @Length(5, 14)
  @IsString({ message: 'Field `number` must be a string' })
  number: string;

  @Length(2, 2, {
    message: 'The `phone_country_code` field length must be 2 characters',
  })
  @IsISO31661Alpha2()
  @IsString({ message: 'Field `country_code` must be a string' })
  @NoEmojis({ message: 'The `country_code` field contains invalid characters' })
  country_code: string;
}
class CompanyDto {
  @Length(2, 30)
  @IsString()
  name: string;

  @Length(2, 128)
  @NoEmojis({ message: 'The `job_title` field contains invalid characters' })
  @IsString({ message: 'Field `job_title` must be a string' })
  job_title: string;
}
class AddressDto {
  @Length(2, 30)
  @NoEmojis({ message: 'The `country` field contains invalid characters' })
  @CountryRequiredWithZipCode()
  @IsString({ message: 'Field `country` must be a string' })
  country: string;

  @Length(2, 128)
  @NoEmojis({ message: 'The `state` field contains invalid characters' })
  @IsString({ message: 'Field `state` must be a string' })
  state: string;

  @Length(2, 128)
  @NoEmojis({ message: 'The `city` field contains invalid characters' })
  @IsString({ message: 'Field `city` must be a string' })
  city: string;

  @Length(2, 255)
  @NoEmojis({ message: 'The `street` field contains invalid characters' })
  @IsString({ message: 'Field `street` must be a string' })
  street: string;

  @Length(2, 255)
  @NoEmojis({ message: 'The `apartment` field contains invalid characters' })
  @IsString({ message: 'Field `apartment` must be a string' })
  apartment: string;

  @Length(2, 10)
  @IsString({ message: 'Field `zip_code` must be a string' })
  zip_code: string;
}

export class CreateContactDto {
  @InvalidDomain({
    message: 'Not allowed to create a contact with @no.reply domain',
  })
  @IsEmail()
  email: string;

  @Length(2, 128)
  @NoEmojis({ message: 'The `first_name` field contains invalid characters' })
  @IsString()
  first_name: string;

  @Length(2, 128)
  @NoEmojis({ message: 'The `last_name` field contains invalid characters' })
  @IsString({ message: 'Field `last_name` must be a string' })
  last_name: string;

  @Length(2, 408)
  @NoEmojis({ message: 'The `description` field contains invalid characters' })
  @IsString({ message: 'Field `description` must be a string' })
  description: string;

  @ValidateNested()
  @Type(() => PhoneDto)
  phone: PhoneDto;

  @ValidateNested()
  @Type(() => CompanyDto)
  company: CompanyDto;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
