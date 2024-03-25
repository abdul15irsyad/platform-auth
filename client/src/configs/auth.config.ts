import { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { API_URL } from '@/app.config';
import { config } from 'dotenv';
config();

export const NEXT_PUBLIC_GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? 'NEXT_PUBLIC_GOOGLE_CLIENT_ID';
export const NEXT_PUBLIC_GOOGLE_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ??
  'NEXT_PUBLIC_GOOGLE_CLIENT_SECRET';
export const NEXT_PUBLIC_GOOGLE_CALLBACK_URL =
  process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL ??
  'NEXT_PUBLIC_GOOGLE_CALLBACK_URL';

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const response = await fetch(`${API_URL}/v1/auth/login`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await response.json();
        if (response.status === 200) {
          return data;
        } else {
          throw data;
        }
      },
    }),
    GoogleProvider({
      clientId: NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async jwt({ token, user, session }) {
      // console.log("jwt");
      if (user) {
        token = { ...token, ...(user as any) };
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session");
      session.user = token;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET ?? 'NEXTAUTH_JWT_SECRET',
  },
  secret: process.env.NEXTAUTH_SECRET ?? 'NEXTAUTH_SECRET',
};
