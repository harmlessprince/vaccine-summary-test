import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { CovidSchema } from './covid';

@Module({imports:[MongooseModule.forFeature([{name: 'Covid', schema: CovidSchema }])]})
export class CovidModule {}
