import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_URL } from "@/app.config";

export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ?? "GOOGLE_CLIENT_ID";
export const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET ?? "GOOGLE_CLIENT_SECRET";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const response = await fetch(`${API_URL}/v1/auth/login`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await response.json();
        if (response.status === 200) {
          return data;
        } else if (response.status === 401) {
          throw new Error(data.message);
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      // console.log("jwt");
      if (user) {
        token.accessToken = (user as any).accessToken;
      }
      console.log({ token, user });
      return token;
    },
    async session({ session, token }) {
      console.log({ session, token });
      // console.log("session");
      session.user = token;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET ?? "NEXTAUTH_JWT_SECRET",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "NEXTAUTH_SECRET",
};
