'use client'

import { Skeleton } from "@/components/ui/skeleton"


type Props = {}

const MainLoading = (props: Props) => {
  return (
    <div className='w-full h-full flex gap-6 flex-col'>
<Skeleton className="w-full h-[100px] rounded-xl" />
<Skeleton className="w-full h-[400px] rounded-xl" />
    </div>
  )
}

export default MainLoading