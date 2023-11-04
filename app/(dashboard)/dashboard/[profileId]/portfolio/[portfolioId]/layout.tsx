import MainNav from '@/components/main-nav'
import SideBar from '@/components/side-bar'
import db from '@/lib/prisma'
import React from 'react'
import {redirect} from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'

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
    <div className=''>
      <MainNav />
    
        <div className='w-[300px] fixed left-4 top-[50%] -translate-y-[50%] p-4 items-center lg:flex hidden'>
        <SideBar portfolios = {portfolios} />
        </div>
       
       <main className='flex-1 p-6 md:p-8   lg:pl-[320px] mt-32 md:mt-32 2xl:max-w-[1300px]   mx-auto w-full  '>
     
        {children}
       
        </main>
   
      </div>
   
    
  )
}

export default PortfolioLayout