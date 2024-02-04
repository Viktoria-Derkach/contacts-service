import { Type } from 'class-transformer';
import {
  IsEmail,
  IsISO31661Alpha2,
  IsPostalCode,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { NoEmojis } from '../../decorators/NoEmoji.decorator';

class PhoneDto {
  @Max(14, { message: 'Field `number` must be 10 or 15 characters' })
  @Min(5)
  @IsString({ message: 'Field `number` must be a string' })
  number: string;

  @Length(2, 2, {
    message: 'The `phone_country_code` field length must be 2 characters',
  })
  @IsISO31661Alpha2()
  @IsString({ message: 'Field `country_code` must be a string' })
  @NoEmojis({ message: 'The `country_code` field contains invalid characters' })
  countryCode: string;
}
class CompanyDto {
  @Max(30)
  @Min(2)
  @IsString()
  name: string;

  @Max(128, {
    message:
      'The `job_title` field length must not be more than 128 characters',
  })
  @Min(2)
  @NoEmojis({ message: 'The `job_title` field contains invalid characters' })
  @IsString({ message: 'Field `job_title` must be a string' })
  jobTitle: string;
}
class AddressDto {
  @Max(30)
  @Min(2, {
    message: 'The `country` field length must not be more than 2 characters"',
  })
  @NoEmojis({ message: 'The `country` field contains invalid characters' })
  @IsString({ message: 'Field `country` must be a string' })
  country: string;

  @Max(128, {
    message: 'The `state` field length must not be more than 128 characters',
  })
  @Min(2)
  @NoEmojis({ message: 'The `state` field contains invalid characters' })
  @IsString({ message: 'Field `state` must be a string' })
  state: string;

  @Max(128, {
    message: 'The `city` field length must not be more than 128 characters',
  })
  @Min(2)
  @NoEmojis({ message: 'The `city` field contains invalid characters' })
  @IsString({ message: 'Field `city` must be a string' })
  city: string;

  @Max(255, {
    message: 'The `street` field length must not be more than 255 characters',
  })
  @Min(2)
  @NoEmojis({ message: 'The `street` field contains invalid characters' })
  @IsString({ message: 'Field `street` must be a string' })
  street: string;

  @Max(255, {
    message:
      'The `apartment` field length must not be more than 255 characters',
  })
  @Min(2)
  @NoEmojis({ message: 'The `apartment` field contains invalid characters' })
  @IsString({ message: 'Field `apartment` must be a string' })
  apartment: string;

  @Max(10, {
    message: 'The `zip_code` field length must not be more than 10 characters',
  })
  @IsPostalCode()
  @IsString({ message: 'Field `zip_code` must be a string' })
  zipCode: string;
}

export class CreateContactDto {
  @IsEmail()
  email: string;

  @Max(128, {
    message:
      'The `first_name` field length must not be more than 128 characters',
  })
  @Min(128)
  @NoEmojis({ message: 'The `first_name` field contains invalid characters' })
  @IsString({ message: 'Field `first_name` must be a string' })
  firstName: string;

  @Max(128, {
    message:
      'The `last_name` field length must not be more than 128 characters',
  })
  @Min(2)
  @NoEmojis({ message: 'The `last_name` field contains invalid characters' })
  @IsString({ message: 'Field `last_name` must be a string' })
  lastName: string;

  @Max(408, {
    message:
      'The `description` field length must not be more than 408 characters',
  })
  @Min(2)
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
