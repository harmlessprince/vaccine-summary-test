import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { CovidService } from './covid/covid.service';
const csvtojsonV2 = require('csvtojson/v2');
import { CovidDataDto } from './covid/covid.data.dto';
import { getDateFromWeek, getYearAndWeekFromIsoString } from './utils/helper';
import { CovidDataFilterDto } from './covid/covid.data.filter.dto';
import { CovidDataOutputDto } from './covid/covid.data.output.dto';
@Injectable()
export class AppService {
  constructor(private readonly covidService: CovidService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async getCovidDataSummary(
    filter: CovidDataFilterDto,
  ): Promise<CovidDataOutputDto[]> {
    return await this.covidService.findCovidData(filter);
  }

  async seedDatabase(): Promise<{ total: number }> {
    try {
      //construct file path
      const dataFilePath = this.loadCsvFilePath('/data/data.csv');
      const dataConverted = await this.convertCsvToJson(dataFilePath);
      //pass constructed data to covid repository
      await this.covidService.createMany(dataConverted);
      return { total: dataConverted.length };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async convertCsvToJson(filePath: string) {
    var arrayToInsert = [];
    try {
      await csvtojsonV2()
        .fromFile(filePath)
        .then(async (source: CovidDataDto[]) => {
          //looping through all the data extracted from the csv file
          // - 332340
          for (var i = 0; i < source.length; i++) {
            const newEntity = new CovidDataDto();
            const { year, week } = getYearAndWeekFromIsoString(
              source[i].YearWeekISO,
            );
            const extractedDate = getDateFromWeek(year, week);
            // console.log(
            //   extractedDate,
            //   { year, week },
            //   getYearAndWeekFromDate(extractedDate),
            // );
            newEntity.YearWeekDate = extractedDate;
            newEntity.YearWeekISO = source[i].YearWeekISO;
            newEntity.FirstDose = source[i].FirstDose;
            newEntity.FirstDoseRefused = source[i].FirstDoseRefused;
            newEntity.SecondDose = source[i].SecondDose;
            newEntity.DoseAdditional1 = source[i].DoseAdditional1;
            newEntity.DoseAdditional2 = source[i].DoseAdditional2;
            newEntity.UnknownDose = source[i].UnknownDose;
            newEntity.NumberDosesReceived = source[i].NumberDosesReceived;
            newEntity.NumberDosesExported = source[i].NumberDosesExported;
            newEntity.Region = source[i].Region;
            newEntity.Population = source[i].Population;
            newEntity.ReportingCountry = source[i].ReportingCountry;
            newEntity.TargetGroup = source[i].TargetGroup;
            newEntity.Vaccine = source[i].Vaccine;
            newEntity.Denominator = source[i].Denominator;
            arrayToInsert.push(newEntity);
          }
        });
    } catch (error) {
      throw new Error(error.message);
    }

    return arrayToInsert;
  }
  loadCsvFilePath(filePath: string) {
    const dataFilePath = __dirname + filePath;
    //check if file exist, otherwise throw not found error
    if (fs.existsSync(dataFilePath)) {
      return dataFilePath;
    }
    return null;
  }
}
