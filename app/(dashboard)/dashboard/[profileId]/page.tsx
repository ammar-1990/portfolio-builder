import InitialPortfolioComponent from "@/components/initial-portfolio-component"
import db from "@/lib/prisma"
import {redirect} from 'next/navigation'


type Props = {
    params:{profileId:string}
}
export const revalidate = 0
const page = async ({params}: Props) => {
    const portfolio = await db.portfolio.findFirst({
        where:{
      profileId:params.profileId
        }
      })

      if(portfolio) return redirect(`/dashboard/${params.profileId}/portfolio/${portfolio.id}`)

  return (
<InitialPortfolioComponent />
  )
}

export default page