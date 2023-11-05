import {
  Project,
  Image as PImage,
  Portfolio,
  Experience,
} from "@prisma/client";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProjectWithImages = Project & { images: PImage[] };
type Props = {
  portfolio: Portfolio & {
    projects: ProjectWithImages[];
    experiences: Experience[];
  };
  preview?: boolean;
  noLink?: boolean;
};

const HeaderKitchen = ({ portfolio }: Props) => {
  return (
    <header className="flex items-center h-32 justify-between">


      {portfolio.imageUrl ? (
        <div className="relative w-20 h-20 ">
          <Image
            alt="logo"
            fill
            src={portfolio.imageUrl}
            className="object-contain"
          />
        </div>
      ) : (
        <p className="text-xl font-bold capitalize">{portfolio.title}</p>
      )}

<nav className="flex items-center gap-[5vw]">
{!!portfolio.projects.length &&<Link className="capitalize text-sm font-semibold" href={'#samples'}>Samples</Link>}
{!!portfolio.experiences.length &&<Link className="capitalize text-sm font-semibold" href={'#projects'}>Experience</Link>}
</nav>


<Menu className="h-5 w-5 cursor-pointer " />

    </header>
  );
};

export default HeaderKitchen;
