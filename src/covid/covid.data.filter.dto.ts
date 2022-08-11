import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { DateToIsBiggerThanDateFrom } from 'src/decorators/dateToIsBiggerThanDateFrom';
import { IsValidISOWeekDate } from 'src/decorators/IsValidISOWeekDate';

//https://regex-generator.olafneumann.org/
//https://regexr.com/
//https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch06s07.html
const dateRegex = /^([1-9]{4})+-W(5[0-3]|[1-4][0-9]|[1-9])$/;
const regexMessage =
  "Year must be 4 digit number, followed by '-', follow by 'W' and then week number between 1 to 53. eg 2020-W10";
export class CovidDataFilterDto {
  @IsValidISOWeekDate({ message: regexMessage })
  @IsOptional()
  dateFrom?: string;

  @DateToIsBiggerThanDateFrom('dateFrom', {
    message: 'dateTo must be bigger/higher than DateFrom',
  })
  @IsValidISOWeekDate({
    message: regexMessage,
  })
  @IsOptional()
  dateTo?: string;

  @IsString()
  @IsOptional()
  c?: string;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  range?: number = 5;
}
