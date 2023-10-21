"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ImagePlus,Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from 'next-cloudinary';
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string;
};

const ImageUpload = ({ disabled, onChange, onRemove, value }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!mounted) return <div className="self-center flex items-center justify-center"><Skeleton className="w-[200px] aspect-square rounded-xl" /></div>

  return <div className="self-center">
    <div className="flex items-center   justify-center">
        {value ? <div className="relative w-[200px] aspect-square overflow-hidden ">

            <Button className="absolute top-1 right-1 z-20"
            variant={'destructive'}
            size={'icon'}
            onClick={()=>onRemove()}
            >
                <Trash className="w-4 h-4" />
            </Button>
            <Image 
            alt="uploaded-image"
            src={value}
            fill
            className="object-contain rounded-md"
            />
        </div> :  <CldUploadWidget uploadPreset="tbjpi9qc" onUpload={onUpload}>
{({open})=>{
const onClick = ()=>{open()}

return <div role="button"


onClick={onClick}
className=" w-[200px] aspect-square overflow-hidden  text-gray-400 border border-dashed rounded-xl flex flex-col items-center"
>
    <ImagePlus className="w-full h-full mr-3" />
    <p>Add Image</p>
   
</div>
}}
    </CldUploadWidget>}



    </div>

   
  </div>;
};

export default ImageUpload;