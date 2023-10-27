"use client";

import React from "react";
import {motion} from 'framer-motion'
type Props = {
  title: string | null;
  bio: string | null;
  skills: string[];
  preview?: boolean;
};

const MainColorful = ({ title, bio, skills, preview }: Props) => {
  return (
    <div className=" h-screen bg-rose-500">
      <div className="container flex items-center h-full">
        <div className="text-white">
          <motion.h2 
          transition={{duration:0.3}}
          initial={{opacity:0,scale:0.9}}
          whileInView={{opacity:1, scale: [0.9, 1.1, 1]}}
          className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold capitalize">{title}</motion.h2>
          <motion.p
       
          transition={{delay:0.3,duration:0.3}}
           initial={{opacity:0,scale:0.9}}
           whileInView={{opacity:1, scale: [0.9, 1.1, 1]}}
          className="text-xs sm:text-sm md:text-base lg:text-2xl  max-w-[400px] sm:max-w-[550px] md:max-:w-[650px] lg:max-w-[850px] first-letter:capitalize text-justify mt-4">{bio}</motion.p>
           <motion.div 
           initial={{opacity:0,x:-100}}
           whileInView={{opacity:1,x:0}}
           transition={{delay:0.9,duration:1}}
           
           className="flex items-center gap-x-2 gap-y-1 max-w-[800px] text-white capitalize flex-wrap mt-6">
            {skills.map((skill)=><div className="p-1 border border-white rounded-md text-[11px] sm:text-sm " key={skill}>{skill}</div>)}
        </motion.div>
        </div>
       
      </div>
    </div>
  );
};

export default MainColorful;
