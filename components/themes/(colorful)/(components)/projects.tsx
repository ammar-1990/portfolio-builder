'use client'

import { cn } from '@/lib/utils';
import { Project, Image as PImage } from '@prisma/client';
import React from 'react'

type ProjectWithImages = Project & { images: PImage[] };
type Props = {
  projects: ProjectWithImages[];
  preview?:boolean
};

const ProjectsColorful = ({projects,preview}: Props) => {
  return (
    <div className={cn('h-screen bg-slate-800 sticky top-0 text-4xl font-bold  text-white ')}>ProjectsColorful</div>
  )
}

export default ProjectsColorful