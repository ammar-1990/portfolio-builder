import Link from 'next/link'
import React from 'react'

type Props = {}

const ContactBasic = (props: Props) => {
  return (
    <div className='h-screen my-container sticky top-[180px] z-10 '>
        <Link
        href={"#contact"}
        className="text-4xl font-bold block text-center p-1 "
      >
        {" "}
        Contact
      </Link>
    </div>
  )
}

export default ContactBasic