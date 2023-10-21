import LandingNav from '@/components/landing-nav'
import React from 'react'

type Props = {children:React.ReactNode}

const LandingLayout = ({children}: Props) => {
  return (
    <div>
        <LandingNav />
        {children}
        </div>
  )
}

export default LandingLayout