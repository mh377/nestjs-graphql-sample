import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../services/app.service';
import { uuid } from 'uuidv4';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return user with id 1', () => {

      var headers = {
        'x-request-id': uuid(),
      }

      expect(appController.getUser(headers, 1)).toBeDefined();
    });
  });
});
