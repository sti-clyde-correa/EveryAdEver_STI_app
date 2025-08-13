import { NestFactory } from '@nestjs/core';
// import { AppModule } from './module/app.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // This will prefix all routes with /api
  await app.listen(8080);
}
bootstrap();
