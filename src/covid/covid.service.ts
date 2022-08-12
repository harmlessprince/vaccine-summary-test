import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import {
  convertISoWeekStringDateToDate,
  getYearAndWeekFromIsoString,
  getYearAndWeekFromDate,
} from '../utils/helper';
import { Covid } from './covid';
import { CovidDataDto } from './covid.data.dto';
import { CovidDataFilterDto } from './covid.data.filter.dto';
import { CovidDataOutputDto } from './covid.data.output.dto';

@Injectable()
export class CovidService {
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
      await this.covidModel.deleteMany({});
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
    var covidDataOutput: CovidDataOutputDto[] = [];
    let weekStart = null;
    let weekEnd = null;
    for (let index = 0; index < chunks; index++) {
      if (index == 0) {
        weekStart = convertedStartYearWeek;
      } else {
        weekStart = weekEnd;
      }
      weekEnd = moment(new Date(weekStart)).add(range, 'w').toDate();
      // console.log(weekEnd, weekStart);
      const queryObject = {
        ReportingCountry: c,
        YearWeekDate: { $gte: weekStart, $lt: weekEnd },
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
        ])
        .exec();
      //  console.log(response)
      if (response.length > 0) {
        covidDataOutput.push({
          weekStart: getYearAndWeekFromDate(weekStart).isoString,
          weekEnd: getYearAndWeekFromDate(weekEnd).isoString,
          NumberDosesReceived: response[0]?.NumberDosesReceived,
        });
      }
    }
    if (filter.sort !== null && filter.sort !== undefined) {
      const sortValue: string = filter.sort;
      this.sortData(sortValue, covidDataOutput);
    }
    return covidDataOutput;
  }
  private sortData(sortValue: string, covidDataOutput) {
    if (sortValue.startsWith('NumberDosesReceived')) {
      if (sortValue.endsWith('[descending]')) {
        this.sortByNumberDosesReceived(covidDataOutput, OrderBy.DESC);
      }
      if (sortValue.endsWith('[ascending]')) {
        this.sortByNumberDosesReceived(covidDataOutput, OrderBy.ASC);
      }
    }
    if (sortValue.startsWith('weekStart')) {
      if (sortValue.endsWith('[descending]')) {
        this.sortByWeekStart(covidDataOutput, OrderBy.DESC);
      }
      if (sortValue.endsWith('[ascending]')) {
        this.sortByWeekStart(covidDataOutput, OrderBy.ASC);
      }
    }
  }
  private sortByNumberDosesReceived(
    covidOutputData: CovidDataOutputDto[],
    orderBy: string,
  ) {
    return covidOutputData.sort((a, b) => {
      if (orderBy == OrderBy.ASC) {
        return Number(a.NumberDosesReceived) - Number(b.NumberDosesReceived);
      }
      if (orderBy == OrderBy.DESC) {
        return Number(b.NumberDosesReceived) - Number(a.NumberDosesReceived);
      }
      //if strings are equal
      return 0;
    });
  }
  private sortByWeekStart(
    covidOutputData: CovidDataOutputDto[],
    orderBy: string,
  ) {
    return covidOutputData.sort((a, b) => {
      if (orderBy == OrderBy.ASC) {
        return a.weekStart.localeCompare(b.weekStart);
      }
      if (orderBy == OrderBy.DESC) {
        return a.weekStart.localeCompare(b.weekStart) * -1;
      }
      //if strings are equal
      return 0;
    });
  }
}
enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}
