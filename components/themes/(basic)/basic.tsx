"use client";
import {
  Experience,
  Image as PImage,
  Portfolio,
  Project,
} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import HeaderBasic from "./(components)/header";
import MainBasic from "./(components)/main";
import ProjectsBasic from "./(components)/projects";
import ExperienceBasic from "./(components)/experice";
import ContactBasic from "./(components)/contact";

type ProjectWithImages = Project & { images: PImage[] };

type Props = {
  portfolio: Portfolio & {
    projects: ProjectWithImages[];
    experiences: Experience[];
   
  };
  preview?: boolean;
  noLink?:boolean
};

const BasicTheme = ({ portfolio, preview,noLink }: Props) => {
  return (
    <main className="bg-white w-full ">
      <HeaderBasic
      preview={preview}
        image={portfolio.imageUrl}
        experience={!!portfolio.experiences.length}
        projects={!!portfolio.projects.length}
        title={portfolio.title}
        noLink={noLink}
      />

      <div className="h-screen" id="home" />

      <MainBasic
       preview={preview}
        title={portfolio.title}
        bio={portfolio.bio}
        skills={portfolio.skills}
        noLink={noLink}
      />
      <div className="h-[500px]" />

      <section className="" id="projects">
        <ProjectsBasic preview={preview} projects={portfolio.projects} noLink={noLink} />
        <div className="h-[500px]"></div>
        <div className="" id="experience"></div>
        <ExperienceBasic preview={preview} experiences={portfolio.experiences}  noLink={noLink} />
        <div className="h-[500px]" id="contact"></div>
        <ContactBasic portfolio={portfolio} />
      </section>
    </main>
  );
};

export default BasicTheme;
