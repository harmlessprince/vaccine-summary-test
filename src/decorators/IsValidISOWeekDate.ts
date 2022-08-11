import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidISOWeekDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidISOWeekDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return useRegex(value) == true ? true: false;
        },
      },
    });
  };
}

function useRegex(isoWeekDate: string): boolean {
  const regex = /^([0-9]{4})+-W(5[0-3]|[1-4][0-9]|[1-9])$/g;
  return regex.test(isoWeekDate);
}
