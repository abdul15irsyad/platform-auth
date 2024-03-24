import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import dataSource from './database/data-source';
import { NODE_ENV, ORIGINS, PORT } from './app.config';
import { ValidationException } from './global/exception/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.enableCors({
    origin: ORIGINS,
    methods: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      validationError: { target: false },
      exceptionFactory: (errors) => {
        return new ValidationException(errors);
      },
    }),
  );
  await dataSource.initialize();

  await app.listen(PORT, () => {
    return logger.log(
      `Application running on port ${PORT}, environment ${NODE_ENV}`,
    );
  });
}
bootstrap();
