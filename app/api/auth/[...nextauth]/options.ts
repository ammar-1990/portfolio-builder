import GoogleProvider from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin"
import type { NextAuthOptions } from 'next-auth'
export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [

    
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),

    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization:{ params: { scope: "email" } }
      
    })
    
    // ...add more providers here
  ],
  pages:{
    signIn:'/login',
    signOut:'/login'
  }
}
