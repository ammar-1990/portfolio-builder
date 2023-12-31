import db from '@/lib/prisma'

import React from 'react'
import { redirect } from 'next/navigation'
import BasicTheme from '@/components/themes/(basic)/basic'
import MoveTheme from '@/components/themes/(colorful)/colorful'
import PreviewInstance from './preview-instanse'

type Props = {
    params:{portfolioId:string}
}

const ExamplePage =async ({params}: Props) => {

    const portfolio = await db.portfolio.findUnique({
        where:{
            id:params.portfolioId
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

    if(!portfolio) return <div>error</div>

  
 
  return (
 <PreviewInstance portfolio={portfolio} />
  )
}

export default ExamplePage