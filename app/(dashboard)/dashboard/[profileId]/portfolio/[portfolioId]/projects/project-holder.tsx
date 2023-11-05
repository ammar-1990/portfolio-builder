import ProjectComponent from '@/components/project-component'
import db from '@/lib/prisma'
import React from 'react'

type Props = {

    projectId:string,
    portfolioId:string,
   
}

const ProjectHolder = async({projectId,portfolioId}: Props) => {

    

    const project = await db.project.findUnique({
        where:{
            id:projectId,
            portfolioId:portfolioId
        },
        include:{
            images:true
        }
    })

  return (
    <ProjectComponent  project={project}  /> 
  )
}

export default ProjectHolder