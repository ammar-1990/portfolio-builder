"use client";
import Link from "next/link";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Image as PImage, Project } from "@prisma/client";
import { useModal } from "@/hooks/modal-hook";
import { ZoomInIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectWithImages = Project & { images: PImage[] };
type Props = {
  projects: ProjectWithImages[];
  preview?:boolean,
  noLink?:boolean
};

const ProjectsBasic = ({ projects,preview,noLink }: Props) => {
  const {onOpen} = useModal()
  return (
    <section className={cn("h-screen my-container sticky top-[95px] sm:top-[66px]  ",!projects.length && 'hidden')}>
      <Link
        href={"#projects"}
        className="text-4xl font-bold block text-center p-1 "
        onClick={(e)=>{
          noLink && e.preventDefault()
        }} 
      >
        {" "}
        Projects
      </Link>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        pagination={{ clickable: true }}
        navigation
        slidesPerView={1}
        className="swiper-container mt-20"
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id} className=" pb-28">
            <div
              className={cn(`w-full sm:w-[450px] md:w-[700px] mx-auto group aspect-video rounded-lg
               overflow-hidden relative   transition duration-300 border
                cursor-pointer  `,preview && 'w-full sm:w-[300px] md:w-[400px]')}
            >
              <div
                className="absolute top-0  aspect-video w-full md:w-[300px] 
               -left-full group-hover:left-0 bg-black/75
                opacity-0 p-4 group-hover:opacity-100  duration-500 group-hover:delay-300 h-full z-50"
              >
                <h2 className="text-white font-bold">{project.title}</h2>
                <p className="text-white text-xs line-clamp-3 ">
                  {project?.description}
                </p>
                <span
                  className="cursor-pointer flex items-center gap-x-2 text-white mt-3 sm:mt-6 w-fit mx-auto"
                  onClick={() =>!preview && onOpen("project-modal", { project: project })}
                >
                  Preview <ZoomInIcon className="w-4 h-4" />
                </span>
              </div>
              {!!project.images.length ? (
                <Image
                  fill
                  alt="project-image"
                  src={project.images[0].url}
                  className="object-cover"
                />
              ) : (
                <Image
                  src={"/no-image.jpg"}
                  fill
                  alt="no-image "
                  className="object-contain"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProjectsBasic;
