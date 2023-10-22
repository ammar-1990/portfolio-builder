"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useModal } from "@/hooks/modal-hook";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {};

const ProjectModal = (props: Props) => {
  const { open, onClose, modalType, data } = useModal();

  const isOpen = open && modalType === "project-modal";

  const [selected, setSelected] = useState("");

  useEffect(()=>{
    if(data?.project?.images[0]?.url){
        setSelected(data?.project?.images[0].url)
    }


  },[data?.project?.images])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <div className="w-full p-4">
          {!!data?.project?.images.length ? (
            <div className="w-full  aspect-video relative   flex-shrink-0 border-b">
              <Image
                src={selected}
                fill
                alt="project-image"
                className="object-contain object-top"
              />
            </div>
          ) : (
            <div className="w-full  aspect-video relative   flex-shrink-0  border-b">
              <Image
                src={"/no-image.jpg"}
                fill
                alt="no image"
                className="object-contain"
              />
            </div>
          )}
          <div className="flex items-center gap-x-3 flex-wrap mt-5 justify-center">
            {data?.project?.images?.map((image) => (
              <div
                key={image.id}
                className={cn(
                  "w-16 h-16 rounded-full relative border overflow-hidden cursor-pointer active:scale-[0.95]  transition",
                  selected === image.url ? "ring-1 ring-offset-2 ring-black" : 'hover:scale-105'
                )}
                onClick={() => setSelected(() => image.url)}
              >
                <Image
                  src={image.url}
                  alt="image-project"
                  fill
                  className="object-contain p-1"
                />
              </div>
            ))}
          </div>

          <p className="px-4 rounded-full mt-4 text-neutral-600 w-fit text-xs">
            {new Date(data?.project?.createdAt!).toLocaleDateString()}
          </p>

          <div className="space-y-1 px-4">
            <h2 className="text-xl capitalize font-semibold">
              {data?.project?.title}
            </h2>
            <p className="text-xs text-zinc-600  overflow-y-auto max-h-[250px] myScroll">
              {data?.project?.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
