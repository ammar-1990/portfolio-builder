import EmptyComponent from '@/components/empty-component'
import ProjectComponent from '@/components/project-component'
import { Button } from '@/components/ui/button'

import db from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

type Props = {
  params:{portfolioId:string,profileId:string}
}
export const revalidate = 0
const page =async ({params}: Props) => {
const projects = await db.project.findMany({
  where:{
    portfolioId:params.portfolioId
  },
  include:{
    images:true
  }
})

  return (
    <div className='h-full flex flex-col flex-1'>
      <h2 className='text-3xl font-bold'>Edit your projects</h2>
      {!projects.length &&<EmptyComponent title='No projects found' />}
      <div className=' mt-10 p-3'>
      <div className='  grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-3  p-4 overflow-y-auto  '>
        {projects.map((project)=><ProjectComponent  project={project} key={project.id} /> )}

      </div>
      </div>
     
      <div className='flex-1' />
      <div className='mt-auto'>
        <Link href={`/dashboard/${params.profileId}/portfolio/${params.portfolioId}/projects/new`}>
        <Button>Add new project</Button></Link>
        
        </div>
    
    </div>
  )
}

export default page