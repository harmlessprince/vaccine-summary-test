import * as moment from 'moment';
import { convertISoWeekStringDateToDate } from '../utils/helper';
import { CovidDataDto } from '../covid/covid.data.dto';
import { CovidDataOutputDto } from '../covid/covid.data.output.dto';

export const CovidDataStub = (): CovidDataDto => {
  const data = new CovidDataDto();
  data.YearWeekDate = convertISoWeekStringDateToDate('2020-W20');
  (data.YearWeekISO = '2020-W20'), (data.FirstDose = 0);
  data.FirstDoseRefused = '0';
  data.SecondDose = 3;
  data.DoseAdditional1 = 1;
  data.DoseAdditional2 = 1;
  data.UnknownDose = 3;
  data.NumberDosesReceived = 200;
  data.NumberDosesExported = 4;
  data.Region = 'AT';
  data.Population = 120000;
  data.ReportingCountry = 'AT';
  data.TargetGroup = 'none';
  data.Vaccine = 'ATX';
  data.Denominator = 1233;
  return data;
};

export const CovidDataOutputStub = (): CovidDataOutputDto => {
  const data = new CovidDataOutputDto();
  data.NumberDosesReceived = 4000;
  data.weekStart = '2020-W20';
  data.weekEnd = '2020-W30';
  return data;
};
