"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ImageIcon, ImagePlus,Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from 'next-cloudinary';
import { Skeleton } from "@/components/ui/skeleton"
import { useModal } from "@/hooks/modal-hook";

type Props = {
  disabled: boolean;
  onChange: (value:string) => void;
  onRemove: (val:string) => void;
  value: string[]  ;
};

const ImageManyUpload = ({ disabled, onChange, onRemove, value }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

const {onOpen} = useModal()

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!mounted) return <div className="self-start flex items-center justify-center"><Skeleton className="w-[200px] aspect-square rounded-xl" /></div>

  return <div className="flex flex-col gap-y-3">
    <div className="flex items-center   flex-wrap gap-x-2">
        {value.map(el=><div key={el} className="relative w-[70px] aspect-square hover:scale-105 transition cursor-pointer "
        onClick={()=>{onOpen('image-modal',{url:el})}}
        >

<Button className="absolute -top-1 -right-1 z-20 w-5 h-5 p-0 "
variant={'destructive'}

onClick={()=>onRemove(el)}
type="button"
>
    <Trash className="w-2 h-2" />
</Button>
<Image 
alt="uploaded-image"
src={el}
fill
className="object-contain rounded-full border"
/>
</div>) }

        
</div>
        
        <CldUploadWidget uploadPreset="tbjpi9qc" onUpload={onUpload}>
{({open})=>{
const onClick = ()=>{open()}

return <Button

type="button"
onClick={onClick}
className="self-start"
>
   
   Add image <ImageIcon className="w-4 h-4 ml-2" />
</Button>
}}
    </CldUploadWidget>



   

   
  </div>;
};

export default ImageManyUpload;