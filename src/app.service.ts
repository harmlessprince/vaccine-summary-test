import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { CovidRepository } from './covid/covid.repository';
const csvtojsonV2 = require('csvtojson/v2');
import { CovidDataDto } from './covid/covid.data.dto';
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
        .then(async (source: CovidDataDto[]) => {
          for (var i = 0; i < source.length; i++) {
            const newEntity = new CovidDataDto();
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
    return {
      success: true,
      message: 'Database seeded successfully',
      total: arrayToInsert.length,
    };
  }
}