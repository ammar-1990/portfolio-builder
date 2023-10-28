"use client";

import { cn } from "@/lib/utils";
import { Project, Image as PImage } from "@prisma/client";
import Image from "next/image";
import React from "react";
import ProjectComponent from "./project-component";
import { motion } from "framer-motion";

type ProjectWithImages = Project & { images: PImage[] };
type Props = {
  projects: ProjectWithImages[];
  preview?: boolean;
};

const ProjectsColorful = ({ projects, preview }: Props) => {
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
      className={cn("text-white text-lg sm:text-3xl md:text-5xl lg:text-7xl p-8 sm:p-20 uppercase", preview && "text-lg sm:text-lg md:text-lg lg:text-lg")}>
        projects
      </motion.h2>
        <div className="mt-10 flex items-center max-w-[1100px] mx-auto overflow-x-auto myScroll gap-4 p-3 snap-mandatory  snap-x overflow-y-hidden">
          {" "}
          {projects.map((project) => (
       <ProjectComponent preview={preview} project={project} key={project.id} />
          ))}
        </div>
    
    </div>
  );
};

export default ProjectsColorful;
