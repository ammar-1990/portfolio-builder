"use client";
import { Experience, Portfolio, Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion"

type Props = {
  portfolio: Portfolio & { projects: Project[]; experiences: Experience[] };
};

const BasicTheme = ({ portfolio }: Props) => {

    const container = {
    
        show: {
     
          transition: {
            staggerChildren: 0.16
          }
        }
      }
      
      const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
      }

  return (
    <main className="bg-white">
        {/* Header */}
      <header className=" h-16 fixed top-0 w-full bg-black z-10">
        <div className="my-container flex items-center justify-between w-full h-full">
          {!!portfolio.imageUrl ? (
            <Link href={"#home"}>
              <div className="w-12 h-12 relative bg-white rounded-full overflow-hidden ">
                <Image
                  fill
                  src={portfolio?.imageUrl as string}
                  alt="logo"
                  className="object-contain "
                />
              </div>
            </Link>
          ) : (
            <Link href={"#home"}>
              <span className="font-bold text-black text-lg  md:text-xl">
                {portfolio.title}
              </span>
            </Link>
          )}

          <nav className="flex items-center sm:gap-x-8 gap-x-4  md:gap-x-20 text-xs md:text-base text-white">
            <Link
              className=" font-semibold transition p-1"
              href={"#home"}
            >
              Home
            </Link>
            {!!portfolio.projects.length && (
              <Link
                className=" font-semibold transition p-1"
                href={"#projects"}
              >
                Projects
              </Link>
            )}
            {!!portfolio.experiences.length && (
              <Link
                className=" font-semibold transition p-1"
                href={"#experience"}
              >
                Experience
              </Link>
            )}
          </nav>
        </div>
      </header>
      {/* main page */}
      <div className="h-screen"/>
      <section className="flex items-center justify-center h-screen flex-col  fixed top-0 w-screen left-0">
<motion.h2
initial={{x:-50,opacity:0}}
whileInView={{x:0,opacity:1}}
viewport={{once:true}}
className="text-3xl font-bold tracking-widest capitalize">{portfolio.title}</motion.h2>
<motion.p 
initial={{x:-50,opacity:0}}
whileInView={{x:0,opacity:1}}
transition={{delay:0.3}}
viewport={{once:true}}
className=" text-neutral-600 first-letter:capitalize text-center text-sm sm:text-base">{portfolio.bio}</motion.p>

<motion.div 
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{once:true}}

className="flex items-center  w-full   justify-center gap-4 sm:gap-8 mt-10 flex-wrap">
   {portfolio.skills.map((skill,i)=>
   <motion.div
   variants={item}
  
   className="capitalize py-2 px-4  flex-shrink-0 bg-black text-white rounded-full sm:text-xs text-[9px]" key={skill}>{skill}</motion.div>)}
</motion.div>
      </section>

{/* projects */}
      <section className="h-screen my-container">

      </section>
    </main>
  );
};

export default BasicTheme;
