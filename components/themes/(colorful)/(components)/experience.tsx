"use client";

import { Experience } from "@prisma/client";
import { motion } from "framer-motion";
import ExperienceComponent from "./experience-component";
import { cn } from "@/lib/utils";

type Props = { experiences: Experience[]; preview?: boolean };

const ExperienceColorful = ({ experiences, preview }: Props) => {

  
      
      

  return (
    <div className="sticky top-0 h-screen bg-yellow-200 text-slate-800 text-4xl font-bold z-0 p-3 ">
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className={cn("text-slate-800 text-lg sm:text-3xl md:text-5xl lg:text-7xl p-8 sm:p-20 uppercase", preview && "text-lg sm:text-lg md:text-lg lg:text-lg")}
      >
        experience
      </motion.h2>

      <motion.div
     
      initial="hidden"
      whileInView="show"
      className={cn("mt-10 flex max-w-[1200px] mx-auto  py-3 overflow-x-auto snap-x snap-mandatory  sm:px-8 gap-8 max-h-[400px] overflow-y-auto myScroll",preview && 'sm:grid-cols-1 md:grid-cols-1')}>
        {experiences.map((experience) => (
         <ExperienceComponent key={experience.id} experience={experience} />
        ))}
      </motion.div>
    </div>
  );
};

export default ExperienceColorful;
