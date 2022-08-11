import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

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

  vaccineSummary(: type) {}
}
