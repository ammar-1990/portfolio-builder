import db from '@/lib/prisma'

import React from 'react'
import { redirect } from 'next/navigation'
import BasicTheme from '@/components/themes/(basic)/basic'
import MoveTheme from '@/components/themes/(move)/move'

type Props = {
    params:{previewId:string}
}

const PreviewPage =async ({params}: Props) => {

    const portfolio = await db.portfolio.findUnique({
        where:{
            id:params.previewId
        },
        include:{
            experiences:true,
            projects:{
                include:{
                    images:true
                }
            }
        }
    })

    if(!portfolio) return redirect('/dashboard')

    const preview : { [key: string]: JSX.Element } = {
        basic:<BasicTheme portfolio={portfolio} />,
        move:<MoveTheme />
    }
 
  return (
  preview[portfolio.theme ]
  )
}

export default PreviewPage