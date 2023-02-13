import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
        }
    }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id_token: unknown,
  }
}

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env["GOOGLE_CLIENT_ID"],
            clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
          // Persist the id_token to the token
          if (account) {
            token.id_token = account.id_token;
          }
          return token;
        },
        async session({ session, token }) {
          // Send send the id_token to the client
          session.id_token = token.id_token;
          return session;
        },
    },
}

export default NextAuth(authOptions);