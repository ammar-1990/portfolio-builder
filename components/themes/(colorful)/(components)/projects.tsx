'use client'

import { Project, Image as PImage } from '@prisma/client';
import React from 'react'

type ProjectWithImages = Project & { images: PImage[] };
type Props = {
  projects: ProjectWithImages[];
  preview?:boolean
};

const ProjectsColorful = ({projects,preview}: Props) => {
  return (
    <div className='h-screen bg-slate-800'>ProjectsColorful</div>
  )
}

export default ProjectsColorful