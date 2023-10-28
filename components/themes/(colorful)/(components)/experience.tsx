"use client";

import { Experience } from "@prisma/client";
import { motion } from "framer-motion";
import ExperienceComponent from "./experience-component";

type Props = { experiences: Experience[]; preview?: boolean };

const ExperienceColorful = ({ experiences, preview }: Props) => {

    const container = {
    
        show: {
     
          transition: {
            staggerChildren: 0.2
          }
        }
      }
      
      

  return (
    <div className="sticky top-0 h-screen bg-yellow-200 text-slate-800 text-4xl font-bold z-0 p-3 ">
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="text-slate-800 text-lg sm:text-3xl md:text-5xl lg:text-7xl p-8 sm:p-20 uppercase"
      >
        experience
      </motion.h2>

      <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-3  sm:px-8 gap-8 max-h-[400px] overflow-y-auto myScroll">
        {experiences.map((experience) => (
         <ExperienceComponent key={experience.id} experience={experience} />
        ))}
      </motion.div>
    </div>
  );
};

export default ExperienceColorful;
