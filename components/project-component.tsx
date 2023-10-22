"use client";
import { Image as PImage, Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { MouseEventHandler } from "react";
import { Button } from "./ui/button";
import { Edit, Trash } from "lucide-react";
import { useModal } from "@/hooks/modal-hook";
import TipTool from "./tip-tool";

type Props = {
  project: Project & { images: PImage[] };
};

const ProjectComponent = ({ project }: Props) => {
  const params = useParams();

  const { onOpen } = useModal();

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onOpen("alert-modal", {
      url: `/api/${params.profileId}/${params.portfolioId}/project/${project.id}`,
      back: `/dashboard/${params.profileId}/portfolio/${params.portfolioId}/projects`,
      message:'Project'
    });
  };
  return (
   
      <div className="    border rounded-2xl overflow-hidden h-full col-span-1  transition flex flex-col ">
      {!!project.images.length ? (
          <div className="w-full  aspect-video relative  flex-shrink-0 border-b">
            <Image
              src={project.images[0].url}
              fill
              alt="project-image"
              className="object-cover object-top"
            />
          </div>
        ):
        <div className="w-full  aspect-video relative  flex-shrink-0  border-b">
        <Image
          src={'/no-image.jpg'}
          fill
          alt="no image"
          className="object-contain"
        />
      </div>
        }
        <p className="px-4 rounded-full mt-4 text-neutral-600 w-fit text-xs">{new Date(project.createdAt).toLocaleDateString()}</p>

<div className="space-y-1 px-4">
          <h2 className="text-xl capitalize font-semibold line-clamp-1">{project.title}</h2>
          <p className="text-xs text-zinc-600 line-clamp-4 overflow-hidden">
            {project.description}
          </p>
        </div>

        <div className="flex items-center gap-x-1 my-3 px-4 ">
        <TipTool side="left" title="Edit">
        <Link
     
      href={`/dashboard/${params.profileId}/portfolio/${params.portfolioId}/projects/${project.id}`}
    >
      
        <Button
        size={'icon'}
         
          variant={"default"}
          className={
            "p-0 w-7 h-7"
          }
        >
          <Edit className="w-3 h-3 text-whte" />
        </Button>
        </Link>
        </TipTool>
        <TipTool side="right" title="Delete">

        <Button
        size={'icon'}
          onClick={handleDelete}
          variant={"destructive"}
          className={
            "p-0 w-7 h-7"
          }
        >
          <Trash className="w-3 h-3 text-whte" />
        </Button>
        </TipTool>
        </div>
        
       
     
      </div>

  );
};

export default ProjectComponent;
