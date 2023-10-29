"use client";

import { cn } from "@/lib/utils";
import { Project, Image as PImage } from "@prisma/client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import ProjectComponent from "./project-component";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type ProjectWithImages = Project & { images: PImage[] };
type Props = {
  projects: ProjectWithImages[];
  preview?: boolean;
};

const ProjectsColorful = ({ projects, preview }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null)



  const handleNextClick = () => {


    containerRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });

  };
  const handleBackClick = () => {

  

    containerRef.current?.scrollBy({
      left:-300,
      behavior: "smooth",
    });
 
  };

  return (
    <div
      id="projects"
      className={cn(
        "h-screen bg-slate-800 sticky top-0 text-4xl font-bold  text-white p-3 "
      )}
    >
      <motion.h2
         initial={{ opacity: 0, x: -100 }}
         whileInView={{ opacity: 1, x: 0 }}
         transition={{  duration: 1 }}
      className={cn("text-white text-lg sm:text-3xl md:text-5xl lg:text-7xl p-8 sm:p-20 pb-4 sm:pb-4 uppercase", preview && "text-lg sm:text-lg md:text-lg lg:text-lg")}>
        projects
      </motion.h2>
      <div className="max-w-[300px] w-full flex items-center justify-between mx-auto">
        <Button variant={'ghost'} className="uppercase" onClick={handleBackClick}>back</Button>
        <Button variant={'ghost'} className="uppercase" onClick={handleNextClick}>next</Button>
        </div>
        <div ref={containerRef} className="mt-2 flex items-center max-w-[1100px] mx-auto overflow-x-auto noScroll gap-4 p-3 snap-mandatory  snap-x overflow-y-hidden">
          {" "}
          {projects.map((project,i) => (
       <ProjectComponent preview={preview} project={project} key={project.id} />
          ))}
        </div>
      


    
    </div>
  );
};

export default ProjectsColorful;
