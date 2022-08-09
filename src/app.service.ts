import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { CsvParser } from 'nest-csv-parser';
@Injectable()
export class AppService {
  constructor(private readonly csvParserService: CsvParser){}
  getHello(): string {
    return 'Hello World!';
  }

  async seedDatabase(){
    // console.log(__dirname + 'data.csv');
    const dataFilePath = __dirname + '/data/data.csv';
    console.log();
    if (fs.existsSync(dataFilePath)) {
      const stream = fs.createReadStream(dataFilePath, { encoding: "utf-8" });
      const VaccineSummaryEntities = await this.csvParserService.parse(stream, VaccineSummaryEntity)
      console.log(VaccineSummaryEntities);
    }else{
      throw new NotFoundException('Csv file not found')
    }
    

  }
}

class VaccineSummaryEntity {
  YearWeekISO: string
  FirstDose: number
  FirstDoseRefused: string
  SecondDose: number
  DoseAdditional1: number
  DoseAdditional2: number
  UnknownDose: number
  NumberDosesReceived: number
  NumberDosesExported: number
  Region: string
  Population: number
  ReportingCountry: string
  TargetGroup: string
  Vaccine: string
  Denominator: number
}
