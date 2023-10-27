import ProjectForm from '@/components/project-form'
import db from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import { isMongoId } from '@/lib/isMongodbId'
import ExperienceForm from '@/components/experience-form'

type Props = {
    params:{projectId:string,experienceId:string}
}

const page =async ({params}: Props) => {

    // const isValid = isMongoId(params.experienceId)

    // if(!isValid && params.experienceId !=='new') return redirect('/dashboard')
    let experience 

    if(params.experienceId === 'new'){
        experience = null
    }
    else{
        experience = await db.experience.findUnique({
            where:{
                id:params.experienceId
            },
        
        })

        if(!experience) throw Error('wrong experience ID, experience does not exist.')

   
    }

    const header = experience ? 'Edit your experience' : 'Add new experience'


  return (
    <div className='h-full flex flex-col'>
    <h2 className='text-3xl font-bold'>{header}</h2>
    <ExperienceForm experience={experience} />

    
  </div>
  )
}

export default page