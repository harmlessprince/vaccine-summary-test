import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import {
  CovidDataOutputStub,
  CovidDataStub,
} from '../test-stubs/covid.data.stubs';
import { Covid, CovidSchema } from './covid';
import { CovidService } from './covid.service';
describe('CovidService', () => {
  let covidService: CovidService;
  let covidModel: Model<Covid>;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    covidModel = mongoConnection.model(Covid.name, CovidSchema);
    const app = await Test.createTestingModule({
      providers: [
        CovidService,
        {
          provide: getModelToken(Covid.name),
          useValue: covidModel,
        },
      ],
    }).compile();
    covidService = app.get<CovidService>(CovidService);
  });
  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });
  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });
  it('CovidService should be defined', () => {
    expect(covidService).toBeDefined();
  });
  describe('createMany', () => {
    it('collection is dropped', async () => {
      await covidModel.insertMany([CovidDataStub()]);
      await covidModel.deleteMany({});
      const response = await covidModel.find();
      expect(response).toEqual([]);
    });
    it('then covid model will be populated with data', async () => {
      const response = await covidModel.insertMany([CovidDataStub()]);
      expect(response.length).toEqual(1);
    });
  });
});
