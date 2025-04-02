import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { useContainer } from 'class-validator';

describe('App E2E (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.enableVersioning({
      type: VersioningType.URI,
    });

    app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          transform: true,
        }),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/v1/tasks (GET)', () => {
    it('should return 200 and an array', async () => {
      const res = await request(app.getHttpServer())
          .get('/v1/tasks')
          .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('/v1/schedules (GET)', () => {
    it('should return 200 and an array', async () => {
      const res = await request(app.getHttpServer())
          .get('/v1/schedules')
          .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
