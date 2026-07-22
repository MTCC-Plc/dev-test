import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('helloWorld query (POST /graphql)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ helloWorld }' })
      .expect(200)
      .expect({ data: { helloWorld: 'Hello World!' } });
  });
});
