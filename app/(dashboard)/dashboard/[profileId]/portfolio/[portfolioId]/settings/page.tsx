import SettingsForm from '@/components/settings-form'
import db from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params:{portfolioId:string}
}

const SettingsPage = async({params}: Props) => {
const portfolio = await db.portfolio.findUnique({
    where:{
        id:params.portfolioId
    }
})

if(!portfolio) return redirect('/dashboard')
  return (
    <div className='w-full md:w-1/3'>
       <h2 className='text-3xl font-bold'>Edit your site</h2>
       <SettingsForm portfolio={portfolio}/>
    </div>
  )
}

export default SettingsPage