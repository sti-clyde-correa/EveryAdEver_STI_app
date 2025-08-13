export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  url: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

export interface UploadConfig {
  path: string;
  maxSize: number;
  allowedTypes: string[];
}

export interface ApiConfig {
  prefix: string;
  version: string;
  rateLimit: {
    window: number;
    max: number;
  };
}

export interface CorsConfig {
  origins: string[];
  methods: string[];
}

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

export interface StorageConfig {
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
  };
}
