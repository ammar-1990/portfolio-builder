import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import db from "./prisma"


export const getCurrentProfile = async ()=>{

    const session =await getServerSession(authOptions)
  if(!session?.user)return null

  const currentUser = await db.profile.findUnique({
    where:{
        email:session.user?.email as string
    }
  })

  if(!currentUser){

    const newUser = await db.profile.create({
        data:{
            name:session.user?.name as string,
            email:session.user?.email as string,
            imageUrl:session.user?.image as string
        }
    })

    return newUser
  }

  return currentUser


    
}