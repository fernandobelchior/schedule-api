import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication, ValidationPipe, VersioningType} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TasksController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        app.enableVersioning({
            type: VersioningType.URI,
        });
        await app.init();
    });

    it('/v1/tasks (GET) should return 200', async () => {
        const res = await request(app.getHttpServer()).get('/v1/tasks');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    afterAll(async () => {
        await app.close();
    });
});
