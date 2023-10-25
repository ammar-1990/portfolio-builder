import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import type { NextAuthOptions } from 'next-auth'
export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [

    
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })

   
    
    // ...add more providers here
  ],
  pages:{
    signIn:'/login',
    signOut:'/login'
  }
}
