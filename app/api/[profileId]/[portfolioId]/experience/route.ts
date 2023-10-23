import { getCurrentProfile } from "@/lib/getCurrentProfile";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request,{params}:{params:{profileId:string,portfolioId:string}}){

    try {
       console.log('done')
        const currentPortfolio = await getCurrentProfile()
        if(!currentPortfolio) return new NextResponse('Unauthenticated',{status:401})
const {profileId, portfolioId} = params

if(!profileId) return new NextResponse('profile Id is required',{status:400})
if(!portfolioId) return new NextResponse('portfolio Id is required',{status:400})

const {place, description, startDate, endDate} = await req.json()
if(!place) return new NextResponse('place is required',{status:400})


const portfolio = await db.portfolio.findFirst({
    where:{
        id:portfolioId,
        profileId:currentPortfolio.id
    }
})

if(!portfolio) return new NextResponse('Unauthorized',{status:403})

const experience = await db.experience.create({
    data:{
        portfolioId:portfolio.id,
        place,
        description,
        startDate,
        endDate
    }
})

return NextResponse.json(experience)

    } catch (error) {
        console.log('[EXPERIENCE_POST_ERROR]:',error) 
        return new NextResponse('internal error',{status:500})
    }

}