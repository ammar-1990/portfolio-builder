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




  return (
    <header className={cn(" py-4 bg-rose-500 transition duration-300  w-full absolute top-0 left-0")}>
      <div  className={cn("flex items-center justify-between text-white container transition duration-300 ")}>
        <Link href="#home"    onClick={(e)=>preview && e.preventDefault()}>
          {image ? (
            <div className="w-16 h-16 relative   overflow-hidden">
              <Image className="object-contain   " src={image} fill alt="logo" />
            </div>
          ) : (
            <p>{title}</p>
          )}
        </Link>
     

      <nav className={cn('flex items-center gap-x-6 font-semibold text-xs sm:text-base',preview && 'text-xs')}>
        {projects && <Link href={'#projects'}  onClick={(e)=>preview && e.preventDefault()}>Projects</Link>}
        {experience && <Link href={'#experience'} onClick={(e)=>preview && e.preventDefault()} >Experience</Link>}
       <Link href={'#contact'}  onClick={(e)=>preview && e.preventDefault()}>Contact</Link>
      </nav>
      </div>
    </header>
  );
};

export default HeaderColorful;
