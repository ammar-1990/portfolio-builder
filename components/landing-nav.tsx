import React from "react";
import Image from "next/image";
import { getCurrentProfile } from "@/lib/getCurrentProfile";
import AvatarComponent from "./avatar-component";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import LoginButton from "./login-button";
import Link from 'next/link'

type Props = {};

const LandingNav = async (props: Props) => {
  const currentProfile = await getCurrentProfile();

  return (
    <div className="flex items-center h-20 justify-between px-6 sm:px-12 md:px-20 lg:px-28">
     <Link href={'/'}>
      <div className="relative w-12 h-12">
        <Image src={"/logo.png"} alt="logo" fill className="object-contain" />
      </div>
      </Link>
      {currentProfile ? (
        <div className="flex items-center gap-x-4">
          <Link href={'/dashboard'}>
          <Button size={'sm'} >
            Dashboard
            <Settings className="w-4 h-4 ml-2" />
          </Button></Link>
         
          <AvatarComponent currentProfile={currentProfile} />{" "}
        </div>
      ) : (
  <LoginButton />
      )}
    </div>
  );
};

export default LandingNav;
