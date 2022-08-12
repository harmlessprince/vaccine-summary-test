import { Test, TestingModule } from '@nestjs/testing';
import { seedDataStubResponse } from './test-stubs/seed.data.stubs';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mockAppService = () => ({
  seedDatabase: jest.fn().mockReturnValue(seedDataStubResponse()),
});
describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useFactory: mockAppService }],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('appController should be defined', () => {
    expect(appController).toBeDefined();
  });
  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello world');
    });
  });
  describe('seedDatabase', () => {
    it('call seedDatabase from app service', async () => {
      // @ts-ignore seedDatabase is a mock for testing purposes
      appService.seedDatabase.mockResolvedValue({ total: 4 });
      expect(appService.seedDatabase).not.toHaveBeenCalled();

      const result = await appService.seedDatabase();
      expect(appService.seedDatabase).toHaveBeenCalled();
      expect(result).toEqual({ total: 4 });
    });
    it('should send response after seeding database', async () => {
      expect(await appController.seedData()).toMatchObject(seedDataStubResponse());
    });
  });
});
