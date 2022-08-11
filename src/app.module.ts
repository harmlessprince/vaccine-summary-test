
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
//1. Initialized project done
//2. Set up env variable done
//3. Connect app to database done
//4. Read data from csv file done
//5. Set schema to save data into database done 
//5. Insert data from csv into the database done
//6. Construct Filter DTo 
//7. Construct Output dto
//8. WWrite query for filtering database
//9. format it to to output dto
//10. Write tests
//11. Dockerize app