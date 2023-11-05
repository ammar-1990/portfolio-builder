import { cn } from '@/lib/utils';
import { Project,Image as PImage, Portfolio, Experience } from '@prisma/client';
import React from 'react'
import HeaderKitchen from './(components)/header-kitchen';
import { Montserrat } from 'next/font/google';
import BannerKitchen from './(components)/banner-kitchen';
import MainKitchen from './(components)/main-kitchen';

type ProjectWithImages = Project & { images: PImage[] };
type Props = {
  portfolio: Portfolio & {
    projects: ProjectWithImages[];
    experiences: Experience[];
  };
  preview?: boolean;
  noLink?:boolean
};

const montserrat = Montserrat({subsets:['latin']})

const KitchenTheme = ({portfolio,preview,noLink}: Props) => {
  return (
    <div className={cn(' bg-white min-h-screen',preview && 'min-h-full',montserrat.className)}>
      <div className='w-full px-3 max-w-[1300px] mx-auto'>
     <HeaderKitchen portfolio={portfolio} />
     <BannerKitchen image={portfolio.projects[2].images[0].url} />
     <MainKitchen portfolio={portfolio} />
      </div>
     
    </div>
  )
}

export default KitchenTheme