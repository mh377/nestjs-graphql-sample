import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix('/api/v1');

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it('get users by id', () => {
    return request(app.getHttpServer())
      .get('/api/v1/users/1')
      .expect(200)
      .expect({
        "id": 1,
        "title": "Mr",
        "firstname": "Test",
        "surname": "User"
      });
  });

  it ('query users by id', () => {

    const graphqlRequest: string = `
      {
        getUser(userId: 1) {
          title,
          firstname,
          surname
        }
      }
      `

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: graphqlRequest })
      .then(({ statusCode, body}) => {
        expect(statusCode).toBe(200);
        expect(body).toBeDefined();
        expect(body.data.getUser).toBeDefined();
        expect(body.data.getUser.firstname).toBe('Test');
        expect(body.data.getUser.surname).toBe('User');
      });
  });
});
