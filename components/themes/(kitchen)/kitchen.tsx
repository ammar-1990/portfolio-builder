import { Project,Image as PImage, Portfolio, Experience } from '@prisma/client';
import React from 'react'

type ProjectWithImages = Project & { images: PImage[] };
type Props = {
  portfolio: Portfolio & {
    projects: ProjectWithImages[];
    experiences: Experience[];
  };
  preview?: boolean;
  noLink?:boolean
};

const KitchenTheme = ({portfolio,preview,noLink}: Props) => {
  return (
    <div>
        {portfolio.bio}
    </div>
  )
}

export default KitchenTheme