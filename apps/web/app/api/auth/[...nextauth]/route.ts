import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from "axios";

const baseEndpoint = process.env.NEXT_PUBLIC_API_URL as string;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        async authorize(credentials: any) {
          try {
            const response = await axios.post(
              `${baseEndpoint}/api/v1/user/signin`,
              {
                email: credentials.email,
                password: credentials.password,
              },
              {
                withCredentials: true,
                // headers: {
                //   "Content-Type": "application/json",
                // },
              }
            );
        
            const user = response.data;
        
            if (!user || !user.id || !user.email) {
              throw new Error("Invalid user data received from the server.");
            }
        
            return {
              id: user.id,
              email: user.email,
            };
          } catch (error) {
            console.error("Error during authorization:", error);
        
            if (axios.isAxiosError(error)) {
              throw new Error(error.response?.data?.message || "Authorization failed.");
            }
            throw new Error("An unexpected error occurred during authorization.");
          }
        },
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({url, baseUrl}){
        console.log("CALLBACK RUNNING");
        return baseUrl + '/chat';
    }
  }
})

export { handler as GET, handler as POST }