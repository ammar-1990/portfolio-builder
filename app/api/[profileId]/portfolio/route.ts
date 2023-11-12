import { getCurrentProfile } from "@/lib/getCurrentProfile";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function POST(req:Request,{params}:{params:{profileId:string}}){

    try {
       
        const currentPortfolio = await getCurrentProfile()
        if(!currentPortfolio) return new NextResponse('Unauthenticated',{status:401})
const {profileId} = params

if(!profileId) return new NextResponse('profile Id is required',{status:400})

const {name,title,bio,email,tel} = await req.json()
if(!name) return new NextResponse(' name is required',{status:400})
if(!title) return new NextResponse(' title is required',{status:400})
if(!bio) return new NextResponse(' bio is required',{status:400})
if(!email) return new NextResponse(' email is required',{status:400})
if(!tel) return new NextResponse(' telephone is required',{status:400})

const portfolio = await db.portfolio.create({
    data:{
        profileId,
        name,
        title,
        bio,
        email,
        tel
    }
})

return NextResponse.json(portfolio)

    } catch (error) {
        console.log('[PORTFOLIO_POST_ERROR]:',error) 
        return new NextResponse('internal error',{status:500})
    }

}