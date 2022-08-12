import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { CovidService } from './covid/covid.service';

const mockCovidService = () => ({
  createMany: jest.fn(),
  findCovidData: jest.fn()
});
describe('AppService', () => {
  let appService: AppService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [AppService, { provide: CovidService, useFactory: mockCovidService }],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  it('AppService should be defined', () => {
    expect(appService).toBeDefined();
  });

});
