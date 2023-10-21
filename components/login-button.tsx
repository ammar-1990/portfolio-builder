'use client'

import React from 'react'
import { Button } from './ui/button'
import { useModal } from '@/hooks/modal-hook'

type Props = {}

const LoginButton = (props: Props) => {
    const {onOpen} = useModal()
  return (
    <Button onClick={()=>onOpen('login-modal')} size={'sm'} className="rounded-full">Login</Button>
  )
}

export default LoginButton