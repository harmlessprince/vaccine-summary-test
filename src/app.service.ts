import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CsvParser } from 'nest-csv-parser';

@Injectable()
export class AppService {
  constructor(private readonly scvParser: CsvParser){}
  getHello(): string {
    return 'Hello World!';
  }

  async seedDatabase(){
    // console.log(__dirname + 'data.csv');
    const dataFilePath = __dirname + '/data/data.csv';
    console.log(fs.existsSync(dataFilePath));
//     const stream = fs.createReadStream(dataFilePath);
// console.log(stream);
    //  const response = 
    //  console.log(response.data)
  }
}
