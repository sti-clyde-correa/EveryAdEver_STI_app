import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import { CorsConfigService } from './cors/cors.service';
import { TypeOrmConfigService } from './typeorm.config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
      validationSchema: Joi.object({
        // Server
        PORT: Joi.number().default(8080),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),

        // Database
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),

        // JWT
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRATION: Joi.string().required(),

        // File Storage
        UPLOAD_PATH: Joi.string().required(),
        MAX_FILE_SIZE: Joi.number().required(),
        ALLOWED_FILE_TYPES: Joi.string().required(),

        // API
        API_PREFIX: Joi.string().default('api'),
        API_VERSION: Joi.string().default('v1'),
        RATE_LIMIT_WINDOW: Joi.number().default(15),
        RATE_LIMIT_MAX: Joi.number().default(100),

        // CORS
        CORS_ORIGINS: Joi.string().required(),
        CORS_METHODS: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, CorsConfigService, TypeOrmConfigService],
  exports: [ConfigService, CorsConfigService, TypeOrmConfigService],
})
export class ConfigModule {}
