'use client'

import { Skeleton } from "@/components/ui/skeleton"


type Props = {}

const MainLoading = (props: Props) => {
  return (
    <div className='w-full h-full flex gap-6 flex-col'>
<Skeleton className="w-full h-[100px] rounded-xl" />
<div className="grid grid-cols-1 gap-4 flex-1 sm:grid-cols-2 md:grid-cols-3   overflow-y-auto myScroll" >
  
<Skeleton className="w-full h-[200px] rounded-xl" />
<Skeleton className="w-full h-[200px] rounded-xl" />
<Skeleton className="w-full h-[200px] rounded-xl" />
<Skeleton className="w-full h-[200px] rounded-xl" />
<Skeleton className="w-full h-[200px] rounded-xl" />
<Skeleton className="w-full h-[200px] rounded-xl" />
   </div>
    </div>
  )
}

export default MainLoading