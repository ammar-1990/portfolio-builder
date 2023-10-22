'use client'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Loader } from "lucide-react"

  import React, { useEffect, useState } from 'react'
  
  type Props = {children:React.ReactNode,title:string,side:"top" | "right" | "bottom" | "left" | undefined}
  
  const TipTool = ({children,title,side}: Props) => {

const [mount,setMount] = useState(false)

useEffect(()=>{
    setMount(true)
},[])

if(!mount) return <Loader className="w-4 h-4 animate-spin" />

    return (
        <TooltipProvider>
        <Tooltip >
          <TooltipTrigger asChild >{children}</TooltipTrigger>
          <TooltipContent  side={side}>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  
  export default TipTool