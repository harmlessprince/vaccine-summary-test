import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import {
  convertISoWeekStringDateToDate,
  getYearAndWeekFromIsoString,
  getYearAndWeekFromDate,
} from 'src/utils/helper';
import { Covid } from './covid';
import { CovidDataDto } from './covid.data.dto';
import { CovidDataFilterDto } from './covid.data.filter.dto';
import { CovidDataOutputDto } from './covid.data.output.dto';

@Injectable()
export class CovidRepository {
  constructor(
    @InjectModel('Covid') private readonly covidModel: Model<Covid>,
  ) {}
  /**
   *
   * @param covidData
   * @returns Promise<Covid[]>
   */
  async createMany(covidData: CovidDataDto[]): Promise<Covid[]> {
    try {
      //this will drop collection if it exists
      //this is to avoid multiple data insert
      await this.covidModel.db.dropCollection('covids');
      //the data will be inserted into the database
      return await this.covidModel.insertMany(covidData);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async findCovidData(
    filter: CovidDataFilterDto,
  ): Promise<CovidDataOutputDto[]> {
    const { dateFrom, dateTo, c, range } = filter;
    const convertedStartYearWeek: Date =
      convertISoWeekStringDateToDate(dateFrom);
    const convertedEndYearWeek: Date = convertISoWeekStringDateToDate(dateTo);
    const numberOfWeeksBetweenDates = moment(convertedEndYearWeek).diff(
      moment(convertedStartYearWeek),
      'week',
    );
    const chunks = Math.ceil(numberOfWeeksBetweenDates / range);
    console.log(numberOfWeeksBetweenDates);
    let covidDataOutput: CovidDataOutputDto[] = [];
    let weekStart = null;
    let weekEnd = null;
    for (let index = 0; index < chunks; index++) {
      if (index == 0) {
        weekStart = convertedStartYearWeek;
      } else {
        weekStart = weekEnd;
      }
      weekEnd = moment(new Date(weekStart)).add(range, 'w').toDate();
      console.log(weekEnd, weekStart);
      const queryObject = {
        ReportingCountry: c,
        YearWeekDate: { $gte: weekStart, $lte: weekEnd },
      };
      const response = await this.covidModel
        .aggregate([
          {
            $match: queryObject,
          },
          {
            $group: {
              _id: '$ReportingCountry',
              NumberDosesReceived: { $sum: '$NumberDosesReceived' },
            },
          },
          {
            $sort: { NumberDosesReceived: -1 },
          },
        ])
        .exec();
      if (response[0]?.NumberDosesReceived > 0) {
        covidDataOutput.push({
          weekStart: getYearAndWeekFromDate(weekStart).isoString,
          weekEnd: getYearAndWeekFromDate(weekEnd).isoString,
          NumberDosesReceived: response[0]?.NumberDosesReceived,
        });
      }
    }
    return covidDataOutput;
  }
}
