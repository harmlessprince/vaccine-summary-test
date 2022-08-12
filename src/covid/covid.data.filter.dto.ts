import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { DateToIsBiggerThanDateFrom } from '../decorators/dateToIsBiggerThanDateFrom';
import { IsValidISOWeekDate } from '../decorators/IsValidISOWeekDate';

//https://regex-generator.olafneumann.org/
//https://regexr.com/
//https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch06s07.html
const dateRegex = /^([1-9]{4})+-W(5[0-3]|[1-4][0-9]|[1-9])$/;
const regexMessage =
  "Year must be 4 digit number, followed by '-', follow by 'W' and then week number between 00 to 53. eg 2020-W10 or 2020-W09";
export class CovidDataFilterDto {
  @IsValidISOWeekDate({ message: regexMessage })
  @IsString()
  dateFrom: string;

  @DateToIsBiggerThanDateFrom('dateFrom', {
    message: 'dateTo must be bigger/higher than DateFrom',
  })
  @IsValidISOWeekDate({
    message: regexMessage,
  })
  @IsString()
  dateTo: string;

  @IsString()
  c: string;

  @IsPositive()
  @IsNumber()
  range: number;

  @IsOptional()
  sort?: string;
}
