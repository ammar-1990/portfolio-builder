'use client'

import {
    Dialog,
    DialogContent,

  } from "@/components/ui/dialog"

import { useModal } from "@/hooks/modal-hook"

import Image from "next/image"




  
  type Props = {}
  
  const ImageModal = (props: Props) => {
const {open,onClose,modalType,data} = useModal()




  

const isOpen = open && modalType === 'image-modal'

    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
       
        <DialogContent className="">
            <div className="w-full aspect-square relative">
                <Image
                className="object-contain rounded-lg"
                fill
                src={data?.url!}
                alt="project-image"
                />

            </div>
      
       
        </DialogContent>
      </Dialog>
    )
  }
  
  export default ImageModal