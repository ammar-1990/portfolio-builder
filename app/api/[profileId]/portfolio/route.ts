import { getCurrentProfile } from "@/lib/getCurrentProfile";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request,{params}:{params:{profileId:string}}){

    try {
       
        const currentPortfolio = await getCurrentProfile()
        if(!currentPortfolio) return new NextResponse('Unauthenticated',{status:401})
const {profileId} = params

if(!profileId) return new NextResponse('portfolio Id is required',{status:400})

const {name} = await req.json()
if(!name) return new NextResponse('profile Id name is required',{status:400})

const portfolio = await db.portfolio.create({
    data:{
        profileId,
        name
    }
})

return NextResponse.json(portfolio)

    } catch (error) {
        console.log('[PORTFOLIO_POST_ERROR]:',error) 
        return new NextResponse('internal error',{status:500})
    }

}