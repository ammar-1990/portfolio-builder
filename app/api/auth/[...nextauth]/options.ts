import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthOptions } from 'next-auth'
import db from "@/lib/prisma"
export const authOptions:NextAuthOptions = {

  adapter: PrismaAdapter(db),
  session:{
    strategy:'jwt'
  },

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
