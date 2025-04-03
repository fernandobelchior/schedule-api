// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import {useContainer} from "class-validator";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

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

    const config = new DocumentBuilder()
        .setTitle('Schedule API')
        .setDescription('API documentation for scheduling and task management')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
