import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Covid } from './covid';
import { CovidDataDto } from './covid.data.dto';

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
}
