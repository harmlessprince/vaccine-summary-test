import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from 'moment';
import { convertISoWeekStringDateToDate } from '../utils/helper';
export function DateToIsBiggerThanDateFrom(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: DateToIsBiggerThanDateFromConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'DateToIsBiggerThanDateFrom' })
export class DateToIsBiggerThanDateFromConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    const dateFrom: Date = convertISoWeekStringDateToDate(relatedValue);
    const dateTo: Date = convertISoWeekStringDateToDate(value);
    return moment(dateTo).isAfter(dateFrom);
  }
}
