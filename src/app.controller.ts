import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CovidDataFilterDto } from './covid/covid.data.filter.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello world';
  }
  @Get('/seed')
  async seedData() {
    const response = await this.appService.seedDatabase();
    return {
      success: true,
      message: 'Database seeded successfully with ' + response.total + ' data',
      total: response.total,
    };
  }
  @Get('/vaccine-summary')
  vaccineSummary(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
        forbidUnknownValues: true,
      }),
    )
    filter: CovidDataFilterDto,
  ) {
    console.log(filter);
  }
}
