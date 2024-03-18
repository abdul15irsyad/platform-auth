import dotenv from 'dotenv';
dotenv.config();

export type NodeEnvironment =
  | 'local'
  | 'development'
  | 'staging'
  | 'production';

export const NODE_ENV = (process.env.NODE_ENV as NodeEnvironment) ?? 'local';
export const PORT = process.env.PORT ? +process.env.PORT : 3000;
export const ORIGINS = process.env.ORIGINS
  ? process.env.ORIGINS.split(',')
  : '*';
