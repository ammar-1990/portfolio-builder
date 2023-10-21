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
      <div className="space-y-4 flex flex-col items-center w-full">
        <Button variant={'ghost'} className="w-full flex items-center gap-x-3 border " onClick={handleLogin}>
 <div className="w-6 h-6 relative">
    <Image src={'/google-logo.png'} fill alt="google-logo" className="object-contain" />
</div>
<p>Google</p>
        </Button>

      </div>
    </DialogContent>
  </Dialog>
  )
}

export default LoginModal