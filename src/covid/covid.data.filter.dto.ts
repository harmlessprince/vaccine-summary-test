import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';
import { DateToIsBiggerThanDateFrom } from 'src/decorators/dateToIsBiggerThanDateFrom';
import { IsValidISOWeekDate } from 'src/decorators/IsValidISOWeekDate';

const dateRegex = /^([1-9]{4})+-W(5[0-3]|[1-4][0-9]|[1-9])$/;
const regexMessage =
  "Year must be 4 digit number, followed by '-', follow by 'W' and then week number between 1 to 53. eg 2020-W10";
export class CovidDataFilterDto {
  //   @Matches(dateRegex, {
  //     message: regexMessage,
  //   })
  @IsValidISOWeekDate({ message: regexMessage })
  @IsOptional()
  dateFrom?: string;

  @DateToIsBiggerThanDateFrom('dateFrom', {message: 'dateTo must be bigger/higher than DateFrom'})
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
  range?: number;
}
