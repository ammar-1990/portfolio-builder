import { getCurrentProfile } from "@/lib/getCurrentProfile";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";


export const runtime = 'edge'

export async function PATCH(req:Request,{params}:{params:{profileId:string,portfolioId:string,projectId:string}}){

    try {


        const currentProfile = await getCurrentProfile()
        if(!currentProfile) return   new NextResponse('Unauthenticated',{status:401})

        const portfolioId = params.portfolioId
        if(!portfolioId) return new NextResponse('portfolio Id is required',{status:401})

        const {title, description, images} = await req.json()

        if(!title) return new NextResponse('title is required',{status:400})

        const projectId = params.projectId

        const portfolio = await db.portfolio.findUnique({
            where:{
                id:params.portfolioId,
                profileId:currentProfile.id
            },
           
        })
        if(!portfolio) return new NextResponse('Unauthorized',{status:400})

        const project = await db.project.findFirst({
            where:{
                id:projectId,
                portfolioId:portfolio.id
            }
        })

        if(!project) return new NextResponse('Unauthorized',{status:400})

        await db.project.update({
            where:{
                id:projectId,
                portfolioId:portfolio.id
            },
            data:{
                title,
                description,
                images:{
                    deleteMany:{}
                }
            }
        })


        const updatedProject = !!images.length ? await db.project.update({
            where:{
                id:projectId,
                portfolioId:portfolio.id
            },
            data:{
               
                images:{
                    createMany:{data:[...images.map((img:{url:string})=>img)]

                    }
                }
            }
        }) :await db.project.findFirst({
            where:{
                id:projectId,
                portfolioId:portfolio.id
            },
          
        }) 

return NextResponse.json(updatedProject)

    } catch (error) {
        console.log("[PROJECT_PATCH_ERROR]:",error)

        return new NextResponse('internal error',{status:400})
    }

}


export async function DELETE(req:Request,{params}:{params:{profileId:string,portfolioId:string,projectId:string}}){

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

        const project = await db.project.delete({
            where:{
                id:params.projectId,
                portfolioId:portfolio.id
            }
        })
        
return NextResponse.json(project)

    } catch (error) {
        console.log("[PROJECT_DELETE_ERROR]:",error)

        return new NextResponse('internal error',{status:400})
    }

}




