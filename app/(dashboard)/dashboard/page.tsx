import { getCurrentProfile } from '@/lib/getCurrentProfile'
import db from '@/lib/prisma'
import { profile } from 'console'
import { redirect} from 'next/navigation'

type Props = {}

const DashBoardPage =async (props: Props) => {
  const currentProfile = await getCurrentProfile()
  if(!currentProfile) return redirect('/')

  const portfolio = await db.portfolio.findFirst({
    where:{
      profileId:currentProfile.id
    }
  })

  if(portfolio) return redirect(`/dashboard/${currentProfile.id}/portfolio/${portfolio.id}`)
  
  return redirect(`/dashboard/${currentProfile.id}`)
}

export default DashBoardPage