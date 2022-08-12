import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CovidDataFilterDto } from './covid/covid.data.filter.dto';
import { CovidDataOutputDto } from './covid/covid.data.output.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello world';
  }
  @Get('/seed')
  async seedData(): Promise<{
    success: boolean;
    message: string;
    total: number;
  }> {
    try {
      const { total } = await this.appService.seedDatabase();
      return {
        success: true,
        message: 'Database seeded successfully with ' + total + ' data',
        total: total,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  @Get('/vaccine-summary')
  async vaccineSummary(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
        forbidUnknownValues: true,
      }),
    )
    filter: CovidDataFilterDto,
  ): Promise<{ summary: CovidDataOutputDto[] }> {
    const response = await this.appService.getCovidDataSummary(filter);
    return { summary: response };
  }
}
