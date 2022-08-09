
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CsvModule } from 'nest-csv-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CovidModule } from './covid/covid.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL,  { useNewUrlParser: true }),
    CsvModule,
    CovidModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// , {
//   auth: {
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//   },
//   dbName: process.env.DATABASE_NAME
// }