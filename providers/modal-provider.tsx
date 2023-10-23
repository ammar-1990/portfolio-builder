'use client'

import AlertModal from '@/components/modals/alert-modal'
import ExperienceModal from '@/components/modals/experience-modal'
import ImageModal from '@/components/modals/image-modal'
import InitialModal from '@/components/modals/initial-modal'
import LoginModal from '@/components/modals/login-modal'
import ProjectModal from '@/components/modals/project-modal'
import React, {useState, useEffect} from 'react'

type Props = {}

const ModalProvider = (props: Props) => {

    const [mounted, setMounted] = useState(false)


    useEffect(()=>{
        setMounted(true)
    },[])

    if(!mounted) return null
    
  return (
   <>
   <InitialModal />
   <LoginModal />
   <AlertModal />
   <ImageModal />
   <ProjectModal />
   <ExperienceModal />
   </>
  )
}

export default ModalProvider