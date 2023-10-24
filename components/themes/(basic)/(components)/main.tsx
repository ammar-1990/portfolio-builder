'use client'
import {motion} from 'framer-motion'

import { useScroll } from '@/hooks/useScroll'

type Props = {

    title:string | null,
    bio:string | null ,
    skills:string[]
}

const MainBasic = ({title,bio,skills}: Props) => {


    const container = {
    
        show: {
     
          transition: {
            staggerChildren: 0.1
          }
        }
      }
      
      const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }


       
      }


      const {scrollY} = useScroll()

    

  return (
    <motion.section style={{opacity:scrollY}} className="flex items-center justify-center h-screen flex-col  fixed top-0 w-screen left-0">
    <motion.h2
    initial={{x:-50,opacity:0,filter: "blur(20px)"}}
    whileInView={{x:0,opacity:1, filter: "blur(0px)"}}
    viewport={{once:true}}
    className="text-3xl font-bold tracking-widest capitalize">{title}</motion.h2>
    <motion.p 
    initial={{x:-50,opacity:0,filter: "blur(20px)"}}
    whileInView={{x:0,opacity:1, filter: "blur(0px)"}}
    transition={{delay:0.3}}
    viewport={{once:true}}
    className=" text-neutral-600 first-letter:capitalize text-center text-sm sm:text-base">{bio}</motion.p>
    
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{once:true}}
    
    className="flex items-center  w-full   justify-center gap-4 sm:gap-8 mt-10 flex-wrap">
       {skills.map((skill,i)=>
       <motion.div
       variants={item}
      
       className="capitalize py-2 px-4  flex-shrink-0 bg-black text-white rounded-full sm:text-xs text-[9px]" key={skill}>{skill}</motion.div>)}
    </motion.div>
          </motion.section>
  )
}

export default MainBasic