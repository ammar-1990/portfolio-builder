'use client'

import { Portfolio } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type Props = {portfolio:Portfolio}

const ContactColorful = ({portfolio}: Props) => {
  return (
    <div className='min-h-[100px]  mt-52 relative  bg-rose-500 text-white p-3  z-10'>
        <h3 className='uppercase font-bold'>contact</h3>
        <div className=" py-4 flex items-center flex-wrap justify-center gap-8 w-full">
        <Link href={`mailto:${portfolio.email}`} >
        <div className="text-white text-xs flex items-center gap-x-2">
         
          <p className="text-white">{portfolio?.email}</p>
        </div>
        </Link>
        {!!portfolio.tel && (
          <div className="text-white text-xs flex items-center gap-x-2">
           
            <p className="text-white">{portfolio?.tel}</p>
          </div>
        )}
        {!!portfolio.facebook && (
         <Link href={portfolio.facebook} title={portfolio.facebook} target="_blank"><div className="text-white text-xs flex items-center gap-x-2">
           <p>Facebook</p>

           
          </div>
          </Link> 
        )}
        {!!portfolio.linkedin && (
          <Link href={portfolio?.linkedin} target="_blank" title={portfolio?.linkedin}>
          <div className="text-white text-xs flex items-center gap-x-2">
         <p>Linkedin</p>

         
          </div>
          </Link>
        )}
        {!!portfolio.instagram && (
          <Link href={portfolio?.instagram} target="_blank" title={portfolio?.instagram}>
          <div className="text-white text-xs flex items-center gap-x-2">
           <p>Instagram</p>

          
          </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ContactColorful