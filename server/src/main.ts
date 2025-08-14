import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { CorsConfigService } from './config/cors/cors.service';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import cookieParser from 'cookie-parser';
const cookieParser = require('cookie-parser');
// import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  // Get configuration services
  const configService = app.get(ConfigService);
  const corsConfigService = app.get(CorsConfigService);

    
app.use(cookieParser());

  // Set global prefix
  const apiConfig = configService.api;
  const globalPrefix = `${apiConfig.prefix}/${apiConfig.version}`;
  app.setGlobalPrefix(globalPrefix);

  

  // Enable CORS
  app.enableCors(corsConfigService.createCorsOptions());

  
  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('EveryAdEver API')
    .setDescription('EveryAdEver API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  // Start the server
  const port = configService.port;
  await app.listen(port);
  
  // Log application status
  const env = configService.nodeEnv;
  const baseUrl = await app.getUrl();
  
  logger.log(`🌍 Environment: ${env}`);
  logger.log(`🚀 Server running on: ${baseUrl}/${globalPrefix}`);
  if (configService.isDevelopment) {
    logger.log(`📚 Swagger Documentation: ${baseUrl}/${globalPrefix}/docs`);
  }
}

bootstrap().catch((error) => {
  new Logger('Bootstrap').error('Failed to start server', error.stack);
  process.exit(1);
});
