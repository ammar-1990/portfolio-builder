'use client'

import BasicTheme from '@/components/themes/(basic)/basic'
import ColorfulTheme from '@/components/themes/(colorful)/colorful'
import KitchenTheme from '@/components/themes/(kitchen)/kitchen'
import { usePreview } from '@/hooks/preview-hook'
import { Experience, Image, Portfolio, Project } from '@prisma/client'
import React from 'react'

type ProjectWithImages = Project & { images: Image[] };

type Props = {
  portfolio: Portfolio & {
    projects: ProjectWithImages[];
    experiences: Experience[];
   
  }}



const PreviewInstance = ({portfolio}: Props) => {
    const {preview} = usePreview()

    const previewObject : { [key: string]: JSX.Element } = {
        basic:<BasicTheme preview={preview} portfolio={portfolio} noLink={true}/>,
        colorful:<ColorfulTheme preview={preview} portfolio={portfolio} noLink={true}/>,
        kitchen:<KitchenTheme preview={preview} portfolio={portfolio} noLink={true}/>,
    }
 
  return (
    previewObject[portfolio.theme ]
  )
}

export default PreviewInstance