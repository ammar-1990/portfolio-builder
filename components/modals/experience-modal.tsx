"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useModal } from "@/hooks/modal-hook";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {};

const ExperienceModal = (props: Props) => {
  const { open, onClose, modalType, data } = useModal();

  const isOpen = open && modalType === "experience-modal";



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <div className="w-full p-4">
        <h2 className='text-2xl font-semibold capitalize '>{data?.experience?.place}</h2>
        <h2 className='text-lg font-semibold capitalize text-neutral-500 '>{data?.experience?.title}</h2>
        <div className='flex items-center gap-x-3 text-neutral-500 text-xs mt-4'>
<span>{data?.experience?.startDate?.toLocaleDateString()}</span>
<span>{data?.experience?.endDate?.toLocaleDateString()}</span>

        </div>
<div className="p-1 overflow-y-auto max-h-[200px] myScroll mt-4 ">
<p className='mt-4 text-neutral-500 text-xs '>{data?.experience?.description}</p>
<div className="mt-3">
{data?.experience?.achievments.map((achievment)=><p className="text-xs text-neutral-500 px-1" key={achievment}>&bull; {achievment}</p>)}

</div>
</div>


        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceModal;
