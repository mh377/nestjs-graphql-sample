import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors();
  app.setGlobalPrefix('/api/v1');
  app.useLogger(app.get(Logger));

  await app.listen(3000);
}
bootstrap();
