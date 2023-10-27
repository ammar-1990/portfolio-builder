'use client'


import Link from 'next/link'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cn } from '@/lib/utils';

type Props = {
  image: string | null;
  experience: boolean;
  projects: boolean;
  title: string | null;
  preview?: boolean;
};

const HeaderColorful = ({
  image,
  projects,
  experience,
  title,
  preview,
}: Props) => {


const [scroll, setScroll] = useState(false)

useEffect(()=>{

  const handleScroll = ()=>{
    scrollY > 15 ? setScroll(true) : setScroll(false)
  }


  window.addEventListener('scroll',handleScroll)


  return ()=>window.removeEventListener('scroll',handleScroll)
},[])

  return (
    <header className={cn(" py-4 bg-rose-500 transition duration-300 fixed top-0 left-0 w-full",scroll && 'bg-white')}>
      <div  className={cn("flex items-center justify-between text-white container transition duration-300 ",scroll && 'text-rose-500')}>
        <Link href="#home">
          {image ? (
            <div className="w-16 h-16 relative   overflow-hidden">
              <Image className="object-contain   " src={image} fill alt="logo" />
            </div>
          ) : (
            <p>{title}</p>
          )}
        </Link>
     

      <nav className='flex items-center gap-x-6 font-semibold'>
        {projects && <Link href={'#projects'}>Projects</Link>}
        {experience && <Link href={'#experience'}>Experience</Link>}
       <Link href={'#contact'}>Contact</Link>
      </nav>
      </div>
    </header>
  );
};

export default HeaderColorful;
