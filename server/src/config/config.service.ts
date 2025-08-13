import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get port(): number {
    return this.configService.get<number>('PORT', 8080);
  }

  get database() {
    return {
      host: this.configService.get('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      name: this.configService.get('DB_NAME'),
      url: this.configService.get('DATABASE_URL'),
    };
  }

  get jwt() {
    return {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION'),
      refreshSecret: this.configService.get('JWT_REFRESH_SECRET'),
      refreshExpiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
    };
  }

  get upload() {
    return {
      path: this.configService.get('UPLOAD_PATH'),
      maxSize: this.configService.get<number>('MAX_FILE_SIZE'),
      allowedTypes: this.configService.get('ALLOWED_FILE_TYPES').split(','),
    };
  }

  get api() {
    return {
      prefix: this.configService.get('API_PREFIX'),
      version: this.configService.get('API_VERSION'),
      rateLimit: {
        window: this.configService.get<number>('RATE_LIMIT_WINDOW'),
        max: this.configService.get<number>('RATE_LIMIT_MAX'),
      },
    };
  }

  get cors() {
    return {
      origins: this.configService.get('CORS_ORIGINS').split(','),
      methods: this.configService.get('CORS_METHODS').split(','),
    };
  }
}
