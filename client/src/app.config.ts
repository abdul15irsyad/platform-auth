export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Irsyad Abdul";
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://irsyadabdul.my.id";
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";
type Environment = "local" | "development" | "staging" | "production";
export const ENV: Environment = process.env.NEXT_PUBLIC_ENV
  ? (process.env.NEXT_PUBLIC_NODE_ENV as Environment)
  : "local";
