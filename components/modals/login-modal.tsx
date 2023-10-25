'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  import {useRouter} from 'next/navigation'

  import { signIn } from "next-auth/react"

  import Image from 'next/image'
import { useModal } from "@/hooks/modal-hook"
import { Button } from "../ui/button"
import LoginTab from "../login-tab"

type Props = {}

const LoginModal = (props: Props) => {

    const {open,modalType,onClose} = useModal()

    const isOpen = open && modalType==='login-modal'

    const router = useRouter()

const handleLogin =async ()=>{
  await  signIn("google",{redirect:false})
  router.refresh()

}

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
    
    <DialogContent className="md:w-[300px]">
      <DialogHeader>
        <DialogTitle className="text-center mt-5">Login</DialogTitle>
       
      </DialogHeader>
      <LoginTab title="google" provider="google" img="/google-logo.png" />
      <LoginTab title="github" provider="github" img="/github-logo.png" />
    </DialogContent>
  </Dialog>
  )
}

export default LoginModal