import ProjectForm from '@/components/project-form'
import db from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import { isMongoId } from '@/lib/isMongodbId'

type Props = {
    params:{projectId:string}
}

const page =async ({params}: Props) => {

    // const isValid = isMongoId(params.projectId)

    // if(!isValid && params.projectId !=='new') return redirect('/dashboard')
    let project 

    if(params.projectId === 'new'){
        project = null
    }
    else{
        project = await db.project.findUnique({
            where:{
                id:params.projectId
            },
            include:{
                images:true
            }
        })

        if(!project) throw Error('Wrong project ID, project does not exist.')

   
    }

    const header = project ? 'Edit your project' : 'Add new project'


  return (
    <div className='h-full flex flex-col'>
    <h2 className='text-3xl font-bold'>{header}</h2>
    <ProjectForm project={project} />
    
  </div>
  )
}

export default page