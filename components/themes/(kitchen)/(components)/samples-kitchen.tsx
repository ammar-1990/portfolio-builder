"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/bundle";
import {
  Project,
  Image as PImage,
  Portfolio,
  Experience,
} from "@prisma/client";
import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ProjectWithImages = Project & { images: PImage[] };
type Props = {
  portfolio: Portfolio & {
    projects: ProjectWithImages[];
    experiences: Experience[];
  };
  preview?: boolean;
  noLink?: boolean;
};

const SamplesKitchen = ({ portfolio }: Props) => {
  SwiperCore.use([Autoplay, Mousewheel]);
  return (
    <div className="py-10" id="samples">
      <h3 className="text-center py-20 text-5xl uppercase tracking-wider">
        samples
      </h3>
      <Swiper
        speed={2000}
        spaceBetween={10}
        mousewheel={{
          eventsTarget: "container",
          forceToAxis: false,
          invert: false,
        }}
        slidesPerView={1.3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
      >
        {portfolio.projects.map((project) => (
          <SwiperSlide className="">
            <Link href={`#${project.id}`}>
              <div
                key={project.id}
                className="w-full   relative h-[300px] md:h-[550px] cursor-pointer"
              >
                <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-10" />
                <Image
                  src={project.images[0].url}
                  alt="sample"
                  className="object-cover"
                  fill
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-32 px-3  max-w-[1300px] mx-auto space-y-36 md:space-y-10">
        {portfolio.projects.map((project, i) => {
          return (
            <div
            id={project.id}
              key={project.id}
              className={cn(
                " flex max-w-[800px] flex-col md:flex-row gap-10 w-full mx-auto items-center",
                i % 2 === 0 && "md:flex-row-reverse"
              )}
            >
              <div className="w-full md:w-1/2 flex-shrink-0 space-y-3">
                <h3 className="text-2xl md:text-4xl font-bold uppercase">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500">{project.description}</p>
              </div>
              <div className="w-full md:w-1/2 flex-shrink-0">
                <Swiper
                 speed={2000}
                 spaceBetween={0}
                 mousewheel={{
                   eventsTarget: "container",
                   forceToAxis: false,
                   invert: false,
                 }}
                 slidesPerView={1}
                 autoplay={{
                   delay: 3000,
                   disableOnInteraction: false,
                   pauseOnMouseEnter: true,
                 }}
                 loop={true}
                >
                  {project.images.map((image) => (
                    <SwiperSlide>
                    <div key={image.id} className="w-full aspect-square relative">
                      <Image
                        alt="a sample"
                        fill
                        src={image.url}
                        className="object-cover"
                      />
                    </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SamplesKitchen;
