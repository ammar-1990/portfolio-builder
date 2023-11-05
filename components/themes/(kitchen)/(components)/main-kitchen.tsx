
import {
  Experience,
  Portfolio,
  Project,
  Image as PImage,
} from "@prisma/client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type ProjectWithImages = Project & { images: PImage[] };
type Props = {
  portfolio: Portfolio & {
    projects: ProjectWithImages[];
    experiences: Experience[];
  };
  preview?: boolean;
  noLink?: boolean;
};

const MainKitchen = ({ portfolio }: Props) => {
  return (
    <div className="mt-12">
          <h2 className="text-center py-20 text-5xl uppercase">about</h2>
          <div
      className="flex flex-col md:flex-row justify-center gap-10   items-center md:h-[550px] 
     "
    >
      
      <motion.article 
          initial={{opacity:0,x:-50}}
          whileInView={{opacity:1,x:0}}
           transition={{duration:0.7}}
      className="text-right space-y-5 w-1/2">
        <h3 className="uppercase sm:text-5xl text-lg font-bold">
          {portfolio.title}
        </h3>
        <p className="text-gray-500 ">{portfolio.bio}</p>
        <button className="py-4 px-8 border border-black  uppercase text-xs font-semibold relative
        after:h-full after:w-0 after:left-1/2 after:absolute after:bg-black after:top-0 after:-translate-x-[50%] after:origin-center after:duration-200
        hover:after:w-[110%] overflow-hidden hover:text-white after:z-[0]
        
        
        "><span className="relative z-10 hover:text-white duration-200">more info</span></button>
      </motion.article>
      <article className="w-1/2 relative h-full flex flex-col gap-10">
        <motion.div
          initial={{opacity:0,x:30}}
          whileInView={{opacity:1,x:0}}
           transition={{duration:0.7}}
          className="md:absolute md:top-0 md:left-0 w-[300px] md:h-full h-[300px] "
        >
            <Image alt={'img-projects'} fill src={portfolio.projects[1].images[0].url} className="object-cover" />
        </motion.div>
        <motion.div
         initial={{opacity:0,y:-30}}
         whileInView={{opacity:1,y:0}}
         transition={{duration:0.7}}
        className="md:absolute md:bottom-0 md:right-0 w-[80%] h-[300px] md:h-[275px] ">
            <Image alt={'img-projects'} fill src={portfolio.projects[3].images[0].url} className="object-cover" />
        </motion.div>
        <div></div>
      </article>
    </div>
    </div>
  
  );
};

export default MainKitchen;
