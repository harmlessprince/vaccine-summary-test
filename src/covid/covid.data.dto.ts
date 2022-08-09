export class CovidDataDto {
    YearWeekISO: string;
    FirstDose: number;
    FirstDoseRefused: string;
    SecondDose: number;
    DoseAdditional1: number;
    DoseAdditional2: number;
    UnknownDose: number;
    NumberDosesReceived: number;
    NumberDosesExported: number;
    Region: string;
    Population: number;
    ReportingCountry: string;
    TargetGroup: string;
    Vaccine: string;
    Denominator: number;
  }