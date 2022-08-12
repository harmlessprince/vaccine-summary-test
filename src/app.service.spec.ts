import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { CovidDataFilterDto } from './covid/covid.data.filter.dto';
import { CovidService } from './covid/covid.service';
import {
  CovidDataOutputStub,
  CovidDataStub,
} from './test-stubs/covid.data.stubs';

const mockCovidService = () => ({
  createMany: jest.fn(),

  findCovidData: jest.fn().mockReturnValue([CovidDataOutputStub()]),
});
describe('AppService', () => {
  let appService: AppService;
  let covidService: CovidService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        AppService,
        { provide: CovidService, useFactory: mockCovidService },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
    covidService = app.get<CovidService>(CovidService);
  });

  it('AppService should be defined', () => {
    expect(appService).toBeDefined();
  });
  describe('getCovidDataSummary', () => {
    it('calls findCovidData from covidService', async () => {
      const stubValue = CovidDataOutputStub();
      // @ts-ignore createMany is a mock for testing purposes
      covidService.findCovidData.mockResolvedValue([stubValue]);
      expect(covidService.findCovidData).not.toHaveBeenCalled();
      const filter = new CovidDataFilterDto();
      filter.dateFrom = '2020-W20';
      filter.dateTo = '2020-W30';
      filter.c = 'AT';
      filter.range = 2;
      const result = await covidService.findCovidData(filter);
      expect(covidService.findCovidData).toHaveBeenCalledWith(filter);
      expect(result).toMatchObject([stubValue]);
    });
    it('should should send array of covid data as output', async () => {
        const filter = new CovidDataFilterDto();
        expect(await appService.getCovidDataSummary(filter)).toMatchObject([CovidDataOutputStub()]);
      });
  });
  describe('seedDatabase', () => {
    it('calls createMany from covid service', async () => {
      // @ts-ignore createMany is a mock for testing purposes
      covidService.createMany.mockResolvedValue('value');
      expect(covidService.createMany).not.toHaveBeenCalled();
      const result = await covidService.createMany([CovidDataStub()]);
      expect(covidService.createMany).toHaveBeenCalled();
      expect(result).toEqual('value');
    });
  });
});
