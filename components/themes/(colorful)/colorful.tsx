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
import ExperienceColorful from "./(components)/experience";
import ContactColorful from "./(components)/contact";

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
    <div className={cn(montserrat.className,'noScroll overflow-y-auto h-screen')}>
  
   
      <MainColorful
        preview={preview}
        title={portfolio.title}
        bio={portfolio.bio}
        skills={portfolio.skills}
        experience={!!portfolio?.experiences?.length}
        projects={!!portfolio?.projects?.length}
      

        image={portfolio.imageUrl}
      />
      <ProjectsColorful projects={portfolio.projects} preview={preview} />
      <ExperienceColorful preview={preview} experiences={portfolio.experiences}/>
      <ContactColorful portfolio={portfolio} />
     
    
  

      
    </div>
  );
};

export default ColorfulTheme;
