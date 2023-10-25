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
  value: string ;
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
        {value ? <div className="relative w-[200px] aspect-square overflow-hidden flex ">

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
            <p className="text-center mt-auto w-full font-bold">Logo</p>
        </div> :  <CldUploadWidget uploadPreset="tbjpi9qc" onUpload={onUpload}>
{({open})=>{
const onClick = ()=>{open()}

return <div role="button"


onClick={onClick}
className=" w-[200px] aspect-square overflow-hidden relative text-gray-400 border-[2px] border-dashed rounded-xl flex flex-col items-center"
>
    <Image src='/placeholder.jpg' fill alt='placehoder' className="object-contain" />
    <p className="mt-auto">Add Logo</p>
   
</div>
}}
    </CldUploadWidget>}



    </div>

   
  </div>;
};

export default ImageUpload;