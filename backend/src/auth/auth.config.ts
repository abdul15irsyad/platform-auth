import dotenv from 'dotenv';
import { PORT } from '../app.config';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET ?? 'PlatformAuthAPI';
export const ACCESS_TOKEN_EXPIRED = process.env.ACCESS_TOKEN_EXPIRED
  ? +process.env.ACCESS_TOKEN_EXPIRED
  : 60 * 60 * 2;
export const REFRESH_TOKEN_EXPIRED = process.env.REFRESH_TOKEN_EXPIRED
  ? +process.env.REFRESH_TOKEN_EXPIRED
  : 60 * 60 * 24 * 3;

export const CLIENT_BASE_URL =
  process.env.CLIENT_BASE_URL ?? 'https://example.com';
export const CLIENT_RESET_PASSWORD_URL =
  process.env.CLIENT_RESET_PASSWORD_URL ?? 'auth/reset-password';
export const CLIENT_EMAIL_VERIFICATION_URL =
  process.env.CLIENT_EMAIL_VERIFICATION_URL ?? 'auth/email-verification';

export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ?? 'google_client_id';
export const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET ?? 'google_client_secret';
export const GOOGLE_CALLBACK_URL =
  process.env.GOOGLE_CALLBACK_URL ??
  `http://localhost:${PORT}/v1/auth/google-redirect`;
