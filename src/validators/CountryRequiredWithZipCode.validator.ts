import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'countryRequiredWithZipCode', async: false })
class CountryRequiredWithZipCodeConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const zipCode = args.object['zip_code'];
    const country = value;

    return !(zipCode && !country);
  }

  defaultMessage(args: ValidationArguments) {
    return 'If zip_code is provided, country must also be provided';
  }
}

export function CountryRequiredWithZipCode(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CountryRequiredWithZipCodeConstraint,
    });
  };
}
