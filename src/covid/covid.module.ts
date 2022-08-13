import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Covid, CovidSchema } from './covid';
import { CovidService } from './covid.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Covid.name, schema: CovidSchema }]),
  ],
  providers: [CovidService],
  exports: [CovidService],
})
export class CovidModule {}
