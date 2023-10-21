import db from '@/lib/prisma'
import React from 'react'
import {redirect} from 'next/navigation'
import { getCurrentProfile } from '@/lib/getCurrentProfile'

type Props = {
    children:React.ReactNode,
    params:{profileId:string}
}

const ProfileLayout =async ({children,params}: Props) => {

const currentProfile = await getCurrentProfile()
if(!currentProfile || currentProfile.id !== params.profileId) return redirect('/')

  return (
    <div className='h-full'>{children}</div>
  )
}

export default ProfileLayout