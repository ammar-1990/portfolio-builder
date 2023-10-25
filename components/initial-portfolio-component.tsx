'use client'

import { useModal } from '@/hooks/modal-hook'

import {useEffect} from 'react'

type Props = {}

const InitialPortfolioComponent = (props: Props) => {


    const {open, onOpen}=useModal()
    useEffect(()=>{
onOpen('initial-modal')
    },[open,onOpen])
  return (
    null
  )
}

export default InitialPortfolioComponent