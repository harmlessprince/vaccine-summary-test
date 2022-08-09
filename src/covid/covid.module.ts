import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CovidSchema } from './covid';
import { CovidRepository } from './covid.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Covid', schema: CovidSchema }]),
  ],
  providers:[CovidRepository],
  exports:[CovidRepository]
})
export class CovidModule {}
