import React from 'react'

type Props = {
    title:string
}

const EmptyComponent = ({title}: Props) => {
  return (
    <div className='flex flex-1 w-full items-center justify-center text-zinc-600 font-semibold'>{title}</div>
  )
}

export default EmptyComponent