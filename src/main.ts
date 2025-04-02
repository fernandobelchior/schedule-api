// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import {useContainer} from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable URI versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // strips unknown properties
        forbidNonWhitelisted: true, // throws an error if extra props are passed
        transform: true, // automatically transforms payloads to DTO instances
      }),
  );

  await app.listen(3000);
}
bootstrap();
