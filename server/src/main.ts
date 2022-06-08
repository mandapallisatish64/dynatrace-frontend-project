import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { BASE_API_PATH } from './leads/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix(`/${BASE_API_PATH}`);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException(
          errors.flatMap((error: ValidationError) =>
            Object.values(error.constraints),
          ),
        ),
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Sales Lead API')
    .setDescription('This is the REST API for sales leads')
    .setVersion('1.0')
    .addTag('sales')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${BASE_API_PATH}`, app, document);

  await app.listen(Number.parseInt(process.env.SERVER_PORT));
}

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});

