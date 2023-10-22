import MainNav from '@/components/main-nav'
import SideBar from '@/components/side-bar'
import db from '@/lib/prisma'
import React from 'react'
import {redirect} from 'next/navigation'

type Props = {
    children:React.ReactNode,
    params:{profileId:string}
}
export const revalidate = 0
const PortfolioLayout =async ({children,params}: Props) => {
  const portfolios = await db.portfolio.findMany({
where:{
  profileId:params.profileId
}
  })

  if(!portfolios.length) return redirect('/')
  return (
    <div className=' h-full flex flex-col'>
      <MainNav />
      <div className='flex flex-1 '>
        <div className='w-[350px] p-4 items-center flex '>
        <SideBar portfolios = {portfolios} />
        </div>
       
        <main className='p-8 flex-1'>
        {children}
        </main>
   
      </div>
   
      </div>
  )
}

export default PortfolioLayout