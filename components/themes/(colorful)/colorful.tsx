"use client";

import {
  Experience,
  Portfolio,
  Project,
  Image as PImage,
} from "@prisma/client";
import React from "react";
import HeaderColorful from "./(components)/header";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import MainColorful from "./(components)/main";
import ProjectsColorful from "./(components)/projects";

type ProjectWithImages = Project & { images: PImage[] };
type Props = {
  portfolio: Portfolio & {
    projects: ProjectWithImages[];
    experiences: Experience[];
  };
  preview?: boolean;
};

const montserrat = Montserrat({
  subsets: ["latin"],
});

const ColorfulTheme = ({ portfolio, preview }: Props) => {
  return (
    <div className={cn(montserrat.className,'bg-rose-500')}>
  
   
      <MainColorful
        preview={preview}
        title={portfolio.title}
        bio={portfolio.bio}
        skills={portfolio.skills}
        experience={!!portfolio?.experiences?.length}
        projects={!!portfolio?.projects?.length}
      

        image={portfolio.imageUrl}
      />
      <ProjectsColorful projects={portfolio.projects} />
      <div className="sticky top-0 h-screen bg-yellow-200 text-slate-800 text-4xl font-bold">asdasd</div>
    
  

      
    </div>
  );
};

export default ColorfulTheme;
