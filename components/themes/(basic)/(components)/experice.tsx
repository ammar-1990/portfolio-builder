import Link from 'next/link'
import React from 'react'

type Props = {}

const ExperienceBasic = (props: Props) => {
  return (
    <div className="h-screen my-container sticky top-[120px] z-10 bg-white" >
        <Link
        href={"#experience"}
        className="text-4xl font-bold block text-center p-1 "
      >
        {" "}
        Experience
      </Link>
    </div>
  )
}

export default ExperienceBasic