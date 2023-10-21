import AboutForm from '@/components/about-form'
import { getAllCountries } from '@/lib/getCountries'
import db from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {params:{portfolioId:string}}

const page = async({params}: Props) => {
  const portfolio = await db.portfolio.findUnique({
    where:{
      id:params.portfolioId
    }
  })

  if(!portfolio) return redirect('/dashboard')
const names = await getAllCountries()

  return (
    <div className='h-full flex flex-col'>
      <h2 className='text-3xl font-bold'>Edit your portfolio</h2>
      <AboutForm names={names} portfolio={portfolio} />
    </div>
  )
}

export default page