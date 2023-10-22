'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
    children:React.ReactNode
}

const Refresher = ({children}: Props) => {

    const pathname = usePathname()
    const router = useRouter()
useEffect(()=>{
    router.refresh()
},[pathname,router])

  return (
    <div className='h-full'>{children}</div>
  )
}

export default Refresher