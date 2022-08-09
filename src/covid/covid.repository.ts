import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Covid } from './covid';
import { CovidDataDto } from './covid.data.dto';

@Injectable()
export class CovidRepository {
  constructor(
    @InjectModel('Covid') private readonly covidModel: Model<Covid>,
  ) {}

  async createMany(covidData: CovidDataDto[]) {
    await this.covidModel.insertMany(covidData);
  }
}
