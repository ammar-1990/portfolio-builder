'use client'

import Image from "next/image"
import { Button } from "./ui/button"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

type Props = {
    title:string,
    provider:string,
    img:string
}



const LoginTab = ({title,provider,img}: Props) => {

const router = useRouter()
    const handleLogin =async ()=>{
        await  signIn(provider,{redirect:false,callbackUrl:'/'})
        router.refresh()
      
      }

  return (
    <div className="space-y-4 flex flex-col items-center w-full">
    <Button variant={'ghost'} className="w-full flex items-center gap-x-3 border " onClick={handleLogin}>
<div className="w-6 h-6 relative">
<Image src={img} fill alt="google-logo" className="object-contain" />
</div>
<p className="capitalize">{title}</p>
    </Button>

  </div>
  )
}

export default LoginTab