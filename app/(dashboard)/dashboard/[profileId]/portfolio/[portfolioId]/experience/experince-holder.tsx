import ExperienceComponent from '@/components/experience-component'
import db from '@/lib/prisma'
import React from 'react'

type Props = {
    experienceId:string
}

const ExperienceHolder = async({experienceId}: Props) => {
    const experience = await db.experience.findUnique({
        where:{
            id:experienceId
        }
    })
  return (
    <div><ExperienceComponent experience={experience} /></div>
  )
}

export default ExperienceHolder