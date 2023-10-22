"use client";
import { Image as PImage, Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { MouseEventHandler } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useModal } from "@/hooks/modal-hook";

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
    <Link
      className="col-span-1  transition hover:scale-105"
      href={`/dashboard/${params.profileId}/portfolio/${params.portfolioId}/projects/${project.id}`}
    >
      <div className="flex items-start   p-4 border rounded-lg justify-between gap-x-4 overflow-hidden relative group ">
        <Button
        size={'icon'}
          onClick={handleDelete}
          variant={"destructive"}
          className={
            "absolute top-1 right-1 z-10 delay-100 opacity-0 group-hover:opacity-100 transition"
          }
        >
          <Trash className="w-4 h-4 text-whte" />
        </Button>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{project.title}</h2>
          <p className="text-sm text-zinc-600 line-clamp-4 overflow-hidden">
            {project.description}
          </p>
        </div>
        {!!project.images.length && (
          <div className="w-[50px] sm:w-[100px] aspect-square relative rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={project.images[0].url}
              fill
              alt="project-image"
              className="object-contain"
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProjectComponent;
