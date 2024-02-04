import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'noEmojis', async: false })
class NoEmojisConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2B06}\u{2934}\u{2935}\u{25AA}\u{25AB}\u{25FE}\u{25FD}\u{25FB}\u{25FC}\u{2B06}\u{2194}\u{2195}\u{21A9}\u{21AA}\u{2139}\u{23EA}\u{23E9}\u{23EB}\u{23EC}\u{23F0}\u{23F3}\u{231A}\u{231B}]/gu;

    return !emojiRegex.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Field cannot contain emojis';
  }
}

export function NoEmojis(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NoEmojisConstraint,
    });
  };
}
