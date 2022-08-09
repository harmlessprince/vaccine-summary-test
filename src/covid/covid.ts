import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class CovidDocument {
  @Prop()
  YearWeekISO: Date;

  @Prop()
  FirstDose: number;

  @Prop()
  FirstDoseRefused: string;

  @Prop()
  SecondDose: number;

  @Prop()
  DoseAdditional1: number;

  @Prop()
  DoseAdditional2: number;

  @Prop()
  UnknownDose: number;

  @Prop()
  NumberDosesReceived: number;

  @Prop()
  NumberDosesExported: number;

  @Prop()
  Region: string;

  @Prop()
  Population: number;

  @Prop()
  ReportingCountry: string;

  @Prop()
  TargetGroup: string;

  @Prop()
  Vaccine: string;

  @Prop()
  Denominator: number;
}
export type Covid = CovidDocument & Document;
export const CovidSchema = SchemaFactory.createForClass(CovidDocument);