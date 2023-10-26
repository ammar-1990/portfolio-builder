import TipTool from '@/components/tip-tool'
import { getCurrentProfile } from '@/lib/getCurrentProfile'
import { ForwardIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {children:React.ReactNode,params:any}

const PreviewLayout =async ({children,params}: Props) => {
    const currentProfile = await getCurrentProfile();

  return (
    <div>
        
        {currentProfile  && (
        <TipTool preview={true} title="Dashboard" side="right">
          <Link
         href={'/dashboard'}
           
            className="fixed bottom-6 right-6
             rounded-full w-12 h-12 cursor-pointer
              flex items-center justify-center text-white 
              hover:scale-105 transition
               active:scale-[0.99] bg-black z-50"
          >
            <ForwardIcon className="w-6 h-6" />
          </Link>
        </TipTool>
      )}
        {children}</div>
  )
}

export default PreviewLayout