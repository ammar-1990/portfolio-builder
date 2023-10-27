import { getCurrentProfile } from "@/lib/getCurrentProfile";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PATCH(req:Request,{params}:{params:{profileId:string,portfolioId:string}}){

    try {


        const currentProfile = await getCurrentProfile()
        if(!currentProfile) return   new NextResponse('Unauthenticated',{status:401})

        const portfolioId = params.portfolioId
        if(!portfolioId) return new NextResponse('portfolio Id is required',{status:401})

        const {name, title, bio, country, imageUrl, skills,tel,email,facebook,instagram,linkedin,theme,published} = await req.json()


        if(theme){

            const portfolio = await db.portfolio.update({
                where:{
                    id:params.portfolioId,
                    profileId:currentProfile.id
                },
                data:{
theme,
published
                }
            })

            return NextResponse.json(portfolio)
        }

        if(!name) return new NextResponse('name is required',{status:400})

        const portfolio = await db.portfolio.update({
            where:{
                id:params.portfolioId,
                profileId:currentProfile.id
            },
            data:{
                name,
                title,
                bio,
                country,
                imageUrl,
                skills,
                tel,
                email,
                facebook,
                linkedin,
                instagram
                
            }
        })

return NextResponse.json(portfolio)

    } catch (error) {
        console.log("[PORTFOLIO_PATCH_ERROR]:",error)

        return new NextResponse('internal error',{status:400})
    }

}


export async function DELETE(req:Request,{params}:{params:{profileId:string,portfolioId:string}}){

    try {


        const currentProfile = await getCurrentProfile()
        if(!currentProfile) return   new NextResponse('Unauthenticated',{status:401})

        const portfolioId = params.portfolioId
        if(!portfolioId) return new NextResponse('portfolio Id is required',{status:401})

      

     

        const portfolio = await db.portfolio.deleteMany({
            where:{
                id:params.portfolioId,
                profileId:params.profileId
            }
        })
        
return NextResponse.json(portfolio)

    } catch (error) {
        console.log("[PORTFOLIO_DELETE_ERROR]:",error)

        return new NextResponse('internal error',{status:400})
    }

}