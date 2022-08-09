import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Covid } from './covid';

@Injectable()
export class CovidRepository {
    constructor(@InjectModel('Covid') private readonly covidModel: Model<Covid>){}


   async  createMany(covidData: any []){
        await this.covidModel.insertMany(covidData)
    }
}