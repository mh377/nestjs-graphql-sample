import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from './app.resolver';
import { AppService } from '../services/app.service';
import { uuid } from 'uuidv4';
import { Logger } from '@nestjs/common';

describe('AppResolver', () => {
  let resolver: AppResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [Logger, AppService, AppResolver],
    }).compile();

    resolver = app.get<AppResolver>(AppResolver);
  });

  describe('root', () => {
    it('should return user with id 1', () => {

      var headers = {
        'x-request-id': uuid(),
      }

      expect(resolver.getUser(headers, 1)).toBeDefined();
    });
  });
});
