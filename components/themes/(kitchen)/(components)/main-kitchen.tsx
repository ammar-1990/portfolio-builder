'use client'
import {
  Experience,
  Portfolio,
  Project,
  Image as PImage,
} from "@prisma/client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ProjectWithImages = Project & { images: PImage[] };
type Props = {
  portfolio: Portfolio & {
    projects: ProjectWithImages[];
    experiences: Experience[];
  };
  preview?: boolean;
  noLink?: boolean;
};

const MainKitchen = ({ portfolio }: Props) => {


  return (
    <div id="main" className="mt-12  px-3  max-w-[1300px] mx-auto">
      <h2 className="text-center py-20 text-5xl uppercase tracking-wider">about</h2>
      <div
        className="flex flex-col md:flex-row justify-center gap-10   items-center md:h-[550px] h-auto
     "
      >
        <motion.article
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="md:text-right space-y-5 md:w-1/2"
        >
          <h3 className="uppercase sm:text-5xl text-lg font-bold">
            {portfolio.title}
          </h3>
          <p className="text-gray-500 ">{portfolio.bio}</p>
          <Link className="inline-block" href={"#samples"}>
            {" "}
            <Button
              variant={"kitchen"}
              className="
        
        
        "
            >
              <span className="relative z-10 hover:text-white duration-200">
                more info
              </span>
            </Button>
          </Link>
        </motion.article>
        <article className="md:w-1/2 relative h-full flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:absolute relative md:top-0 md:left-0 w-[300px] md:h-full h-[300px] "
          >
            <Image
              alt={"img-projects"}
              fill
              src={portfolio.projects[1].images[0].url}
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="md:absolute relative md:bottom-3 md:right-0 w-full md:w-[80%] h-[300px] md:h-[200px] "
          >
            <Image
              alt={"img-projects"}
              fill
              src={portfolio.projects[3].images[0].url}
              className="object-cover"
            />
          </motion.div>
          <div></div>
        </article>
      </div>
    </div>
  );
};

export default MainKitchen;
