import { getCurrentProfile } from "@/lib/getCurrentProfile";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";




export async function PATCH(req:Request,{params}:{params:{profileId:string,portfolioId:string,experienceId:string}}){

    try {


        const currentProfile = await getCurrentProfile()
        if(!currentProfile) return   new NextResponse('Unauthenticated',{status:401})

        const portfolioId = params.portfolioId
        if(!portfolioId) return new NextResponse('portfolio Id is required',{status:401})

        const {title,place, description,achievments, startDate, endDate} = await req.json()

        if(!title) return new NextResponse('title is required',{status:400})
        if(!place) return new NextResponse('place is required',{status:400})

        

        const portfolio = await db.portfolio.findUnique({
            where:{
                id:params.portfolioId,
                profileId:currentProfile.id
            },
           
        })
        if(!portfolio) return new NextResponse('Unauthorized',{status:400})

        const experience = await db.experience.findFirst({
            where:{
                id:params.experienceId,
                portfolioId:portfolio.id
            }
        })

        if(!experience) return new NextResponse('Unauthorized',{status:400})

      const updated =   await db.experience.update({
            where:{
                id:params.experienceId,
                portfolioId:portfolio.id
            },
            data:{
                title,
                place,
                achievments,
                description,
             startDate,
             endDate
            }
        })


      

return NextResponse.json(updated)

    } catch (error) {
        console.log("[EXPERIENCE_PATCH_ERROR]:",error)

        return new NextResponse('internal error',{status:400})
    }

}


export async function DELETE(req:Request,{params}:{params:{profileId:string,portfolioId:string,experienceId:string}}){

    try {


        const currentProfile = await getCurrentProfile()
        if(!currentProfile) return   new NextResponse('Unauthenticated',{status:401})

        const portfolioId = params.portfolioId
        if(!portfolioId) return new NextResponse('portfolio Id is required',{status:401})

      

     

        const portfolio = await db.portfolio.findFirst({
            where:{
                id:params.portfolioId,
                profileId:currentProfile.id
            }
        })

        if(!portfolio) return new NextResponse('Unauthorized',{status:403})

        const experience = await db.experience.delete({
            where:{
                id:params.experienceId,
                portfolioId:portfolio.id
            }
        })
        
return NextResponse.json(experience)

    } catch (error) {
        console.log("[EXPERIENCE_DELETE_ERROR]:",error)

        return new NextResponse('internal error',{status:400})
    }

}




