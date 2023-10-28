"use client";

import { cn } from "@/lib/utils";
import { Project, Image as PImage } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion,AnimatePresence  } from "framer-motion";

type ProjectWithImages = Project & { images: PImage[] };

type props = {
  project: ProjectWithImages;
  preview?:boolean
};

const ProjectComponent = ({ project,preview }: props) => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (project.images.length > 0) {
      setSelectedImage(project?.images[0]?.url);
    }
  }, [project]);

  return (
    <motion.div
    initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{duration:1,delay:0.2}}
      onClick={() => setShow(() => true)}
      key={project.id}
      className={cn("rounded-sm overflow-hidden   snap-start group cursor-pointer relative w-[200px] sm:w-[350px] flex-shrink-0 ",preview && 'sm:w-[200px]')}
    >
      <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 duration-200 z-10 flex items-center justify-center "><p className="font-bold text-lg text-slate-800">See More</p> </div>
      {!!project.images.length ? (
        <div className="w-full  aspect-video relative  flex-shrink-0 ">
          <Image
            src={project.images[0].url}
            fill
            alt="project-image"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div className="w-full  aspect-video relative  flex-shrink-0  ">
          <Image
            src={"/no-image.jpg"}
            fill
            alt="no image"
            className="object-contain"
          />
        </div>
      )}
      <div className="bg-white p-4 space-y-3">
        <h3 className="text-slate-800 text-lg font-semibold uppercase line-clamp-1">
          {project.title}
        </h3>
        <p className=" text-slate-800 w-fit text-xs">
        {new Date(project.createdAt).toLocaleDateString()}
      </p>
        <p className="line-clamp-3 text-xs text-slate-800 first-letter:capitalize font-normal">
          {project.description}
        </p>
      </div>
      <AnimatePresence>
      {show && (
        <>
          <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-40 cursor-default" />
        <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}

      
        className="w-full  max-w-[700px] sm:max-h-[700px] max-h-screen myScroll overflow-y-auto bg-white rounded-sm fixed z-50 top-[50%]  left-[50%] -translate-x-[50%] -translate-y-[50%] p-5 sm:p-3 cursor-default grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div
          className="space-y-2">
          {!!project.images.length ? (
        <div className="w-full  aspect-square relative  flex-shrink-0 ">
          <Image
            src={selectedImage}
            fill
            alt="project-image"
            className="object-cover object-top rounded-sm"
          />
        </div>
      ) : (
        <div className="w-full  aspect-video relative  flex-shrink-0  ">
          <Image
            src={"/no-image.jpg"}
            fill
            alt="no image"
            className="object-contain"
          />
        </div>
      )}
            <div className="grid grid-cols-4 gap-2">
              {project.images.map((image) => (
                <div
                onClick={()=>setSelectedImage(()=>image.url)}
                  key={image.id}
                  className={cn("w-full aspect-square relative cursor-pointer rounded-sm overflow-hidden ",selectedImage === image.url && 'ring-2 ring-black ring-offset-1 duration-150')}
                >
                  <Image
                    alt="one-image"
                    fill
                    className="object-cover "
                    src={image.url}
                  />
                </div>
              ))}
            </div>
            <div>
                
            </div>
          </div>
          <div className="space-y-4" >
          <h3 className="text-slate-800 text-lg font-semibold uppercase line-clamp-1">
          {project.title}
        </h3>
        <p className=" text-slate-800 w-fit text-xs">
        {new Date(project.createdAt).toLocaleDateString()}
      </p>
        <p className=" text-xs text-slate-800 first-letter:capitalize font-normal max-h-[350px] overflow-y-auto myScroll">
          {project.description}
        </p>
          </div>

          <X
            onClick={(e) => {
              e.stopPropagation();
              setShow(() => false);
            }}
            className="w-4 h-4 text-slate-800 absolute top-1 right-1 cursor-pointer"
          />
        </motion.div>
        </>
      )}
      </AnimatePresence>
     
    </motion.div>
  );
};

export default ProjectComponent;
