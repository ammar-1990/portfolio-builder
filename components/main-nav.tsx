import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button';
import { Settings } from 'lucide-react';
import AvatarComponent from './avatar-component';
import LoginButton from './login-button';
import { getCurrentProfile } from '@/lib/getCurrentProfile';
import MainnavLinks from './mainnav-links';
import MainnavLinkMobile from './main-nav-link-mobile';

type Props = {}

const MainNav =async (props: Props) => {
  const currentProfile = await getCurrentProfile();



  return (
    <div className='flex flex-col'>
    <div className="flex items-center h-20 justify-between px-6 sm:px-12 md:px-20 lg:px-28 flex-shrink-0 bg-gradient-to-r border-b">
      <Link href={'/'}>
      <div className="relative w-12 h-12">
        <Image src={"/logo.png"} alt="logo" fill className="object-contain" />
      </div>
      </Link>

    <MainnavLinks />
  
     
      {currentProfile ? (
      
          
         
          <AvatarComponent currentProfile={currentProfile} />
      
      ) : (
  <LoginButton />
      )}
    </div>
    <MainnavLinkMobile />
    </div>
  );
};

export default MainNav