'use client'
import {motion} from 'framer-motion'

import { useScroll } from '@/hooks/useScroll'
import { cn } from '@/lib/utils'

type Props = {

    title:string | null,
    bio:string | null ,
    skills:string[],
    preview?:boolean,
    noLink?:boolean
}

const MainBasic = ({title,bio,skills,preview,noLink}: Props) => {


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
    <motion.section style={{opacity:scrollY}} className={cn("flex items-center justify-center h-screen flex-col  fixed top-0 w-screen left-0",preview && 'absolute w-full h-full')}>
    <motion.h2
    initial={{x:-50,opacity:0,filter: "blur(20px)"}}
    whileInView={{x:0,opacity:1, filter: "blur(0px)"}}
    viewport={{once:true}}
    className={cn("text-3xl font-bold tracking-widest capitalize text-center",preview && 'text-xl')}>{title}</motion.h2>
    <motion.p 
    initial={{x:-50,opacity:0,filter: "blur(20px)"}}
    whileInView={{x:0,opacity:1, filter: "blur(0px)"}}
    transition={{delay:0.3}}
    viewport={{once:true}}
    className={cn(" text-neutral-600 first-letter:capitalize text-center px-2   max-w-[600px] mt-5 text-sm  overflow-y-auto myScroll", preview && 'text-xs')}>{bio}</motion.p>
    
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{once:true}}
    
    className={cn("flex items-center  w-full max-w-[700px]  justify-center  mt-10 flex-wrap",preview && 'gap-x-2 sm:gap-x-2 md:gap-x-2')}>
       {skills.map((skill,i)=>
       <motion.div
       variants={item}
      
       className={cn("capitalize py-2 px-4  flex-shrink-0  text-black font-bold rounded-full sm:text-xs text-[9px]",preview && 'py-2 px-3 text-[9px] sm:text-[9px]  ')} key={skill}>{skill}</motion.div>)}
    </motion.div>
          </motion.section>
  )
}

export default MainBasic