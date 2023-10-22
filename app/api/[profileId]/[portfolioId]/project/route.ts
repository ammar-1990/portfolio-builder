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

const {title, description, images} = await req.json()
if(!title) return new NextResponse('title is required',{status:400})


const portfolio = await db.portfolio.findFirst({
    where:{
        id:portfolioId,
        profileId:currentPortfolio.id
    }
})

if(!portfolio) return new NextResponse('Unauthorized',{status:403})

const project = !!images.length ? await db.project.create({
    data:{
        portfolioId,
        title,
        description,
        images:{
            createMany:{
                data:[...images.map((img:{url:string})=>img)] 
            }
        }
    }
}) : await db.project.create({
    data:{
        portfolioId,
        title,
        description,
       
    }
})

return NextResponse.json(project)

    } catch (error) {
        console.log('[PROJECT_POST_ERROR]:',error) 
        return new NextResponse('internal error',{status:500})
    }

}