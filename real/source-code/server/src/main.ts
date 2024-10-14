import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as mongoose from 'mongoose';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // Set up Mongoose connection events
  mongoose.connection.on('connecting', () => {
    Logger.log('Connecting to MongoDB...');
  });
  mongoose.connection.on('connected', () => {
    Logger.log('Connected to MongoDB.');
  });
  mongoose.connection.on('error', (error) => {
    Logger.error('Error connecting to MongoDB:', error);
  });
  mongoose.connection.on('disconnected', () => {
    Logger.log('Disconnected from MongoDB.');
  });
  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setDescription('The app API description')
    .setVersion('1.0')
    .addTag('Swagger')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  const port = process.env.PORT || 4000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  Logger.log(`Checking for swagger on: http://localhost:${port}/swagger`);

}
bootstrap();
