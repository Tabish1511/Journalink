import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const baseEndpoint = process.env.NEXT_PUBLIC_API_URL as string;
const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if(user && user.password === credentials.password){
            return { id: user.id.toString(), email: user.email }
          }

          return null;
        } catch (error: any) {
          console.error("Authorization error:", error);
          throw new Error(error.response?.data?.message || "Authorization failed.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
          token.uid = token.sub;
      }
      return token;
      },
    session: ({ session, token, user }: any) => {
        if (session.user) {
            session.user.id = token.sub;
        }
        return session
    } 
  },
});

export { handler as GET, handler as POST };
