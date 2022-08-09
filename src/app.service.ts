import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { CovidRepository } from './covid/covid.repository';
const csvtojsonV2 = require('csvtojson/v2');
import * as dayjs from 'dayjs'
@Injectable()
export class AppService {
  constructor(private readonly covidRepository: CovidRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

  async seedDatabase() {
    const dataFilePath = __dirname + '/data/data.csv';
    var arrayToInsert = [];
    if (fs.existsSync(dataFilePath)) {
      await csvtojsonV2()
        .fromFile(dataFilePath)
        .then(async (source: VaccineSummaryEntity[]) => {
          // console.log(typeof(source));
          for (var i = 0; i < source.length; i++) {
            const date = source[i].YearWeekISO;
            console.log(dayjs(date).toISOString);
            const newEntity = new VaccineSummaryEntity();
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
          await this.covidRepository.createMany(arrayToInsert);
        });
    } else {
      throw new NotFoundException('Csv file not found');
    }
  }
}

class VaccineSummaryEntity {
  YearWeekISO: string;
  FirstDose: number;
  FirstDoseRefused: string;
  SecondDose: number;
  DoseAdditional1: number;
  DoseAdditional2: number;
  UnknownDose: number;
  NumberDosesReceived: number;
  NumberDosesExported: number;
  Region: string;
  Population: number;
  ReportingCountry: string;
  TargetGroup: string;
  Vaccine: string;
  Denominator: number;
}
