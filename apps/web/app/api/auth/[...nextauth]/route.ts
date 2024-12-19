import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const baseEndpoint = process.env.NEXT_PUBLIC_API_URL as string;

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
          console.log("'CREDS' CODE REACHED BEFORE THE SIGNIN AXIOS REQ");

          const response = await axios.post(
            `${baseEndpoint}/api/v1/user/signin`,
            {
              email: credentials.email,
              password: credentials.password,
            });

          console.log("'CREDS' CODE REACHED AFTER THE SIGNIN AXIOS REQ");

          const user = response.data;

          if (!user || !user.id || !user.email) {
            throw new Error("Invalid user data received from the server.");
          }

          return { id: user.id, email: user.email };
        } catch (error: any) {
          console.error("Authorization error:", error);
          throw new Error(error.response?.data?.message || "Authorization failed.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ baseUrl }) {
      console.log("CALLBACK RUNNING");
      return `${baseUrl}/chat`;
    },
  },
});

export { handler as GET, handler as POST };
