'use client'

import { Experience } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import React, { MouseEventHandler } from 'react'
import TipTool from './tip-tool'
import Link from 'next/link'
import { Button } from './ui/button'
import { Edit, Trash, ZoomInIcon } from 'lucide-react'
import { useModal } from '@/hooks/modal-hook'

type Props = {
    experience: Experience
}

const ExperienceComponent = ({experience}: Props) => {
const router = useRouter()
const params = useParams()

const {onOpen} = useModal()
const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onOpen("alert-modal", {
      url: `/api/${params.profileId}/${params.portfolioId}/experience/${experience.id}`,
      back: `/dashboard/${params.profileId}/portfolio/${params.portfolioId}/experience`,
      message: "Experience",
    });
  };

  return (
    <div
    className=' border rounded-2xl overflow-hidden h-full col-span-1  transition flex flex-col relative group active:scale-[0.99] p-4'
    >
          <div className="absolute inset-0 bg-black/70 text-white flex items-center justify-center transition duration-200 opacity-0 group-hover:opacity-100 z-10 ">
        <span className="cursor-pointer flex items-center gap-x-2" onClick={()=>onOpen('experience-modal',{experience:experience})}>Preview <ZoomInIcon className="w-4 h-4" /></span>
      </div>
        <h2 className='text-xl font-semibold capitalize line-clamp-1'>{experience.place}</h2>
        <div className='flex items-center gap-x-3 text-neutral-500 text-xs mt-4'>
<span>{experience.startDate?.toLocaleDateString()}</span>
<span>{experience.endDate?.toLocaleDateString()}</span>

        </div>

<p className='mt-4 text-neutral-500 text-xs line-clamp-3 mb-4'>{experience.description}</p>

<div className="flex items-center gap-x-1   mt-auto z-20 ">
        <TipTool side="left" title="Edit">
          <Link
            href={`/dashboard/${params.profileId}/portfolio/${params.portfolioId}/experience/${experience.id}`}
          >
            <Button size={"icon"} variant={"default"} className={"p-0 w-7 h-7"}>
              <Edit className="w-3 h-3 text-whte" />
            </Button>
          </Link>
        </TipTool>
        <TipTool side="right" title="Delete">
          <Button
            size={"icon"}
            onClick={handleDelete}
            variant={"destructive"}
            className={"p-0 w-7 h-7"}
          >
            <Trash className="w-3 h-3 text-whte" />
          </Button>
        </TipTool>
      </div>
    </div>
  )
}

export default ExperienceComponent