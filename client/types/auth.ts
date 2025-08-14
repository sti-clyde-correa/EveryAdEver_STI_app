// types/auth.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface DecodedToken {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}