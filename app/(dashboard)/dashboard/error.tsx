'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"

type props ={
  error:Error & {digest?:string}
  reset:()=>void
}
 
export default function PreviewError({error,reset}:props){

  return(
    <div className="w-full h-screen flex items-center justify-center flex-col gap-3">
<p  className="text-xl font-bold">Something went wrong!</p>
<p className="text-xs text-gray-500 max-w-[600px] text-center">{error.message.length < 70 ? error.message : 'Invalid ID'}</p>
<Link href={'/dashboard'}><Button>Back to dashboard</Button></Link>
    </div>
  )
}