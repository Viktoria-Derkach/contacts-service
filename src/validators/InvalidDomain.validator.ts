import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'InvalidDomain', async: false })
class InvalidDomainConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const noReplyDomain = '@no.reply';

    return !text?.endsWith(noReplyDomain);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid Domain';
  }
}

export function InvalidDomain(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: InvalidDomainConstraint,
    });
  };
}
