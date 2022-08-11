import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';

const dateRegex = /^([1-9]{4})+-W(5[0-3]|[1-4][0-9]|[1-9])$/g;
const regexMessage =
  "Year must be 4 digit number, followed by '-', follow by 'W' and then week number between 1 to 53. eg 2020-W10";
export class CovidDataFilterDto {
  @Matches(dateRegex, {
    message: regexMessage,
  })
  @IsOptional()
  dateFro?: string;

  @Matches(dateRegex, {
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
