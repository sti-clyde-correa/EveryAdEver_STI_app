import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '../config.service';

@Injectable()
export class CorsConfigService {
  constructor(private configService: ConfigService) {}

  createCorsOptions(): CorsOptions {
    const corsConfig = this.configService.cors;
    
    return {
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) {
          return callback(null, true);
        }

        // Check if the origin is in our allowed list
        if (corsConfig.origins.indexOf(origin) !== -1 || this.configService.isDevelopment) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: corsConfig.methods,
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
      exposedHeaders: ['Content-Disposition'],
      maxAge: 3600, // 1 hour
    };
  }
}
