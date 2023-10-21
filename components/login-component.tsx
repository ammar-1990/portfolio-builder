'use client'

import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {}

const LoginComponent = (props: Props) => {
 
    const router = useRouter();
    const handleLogin = async () => {
      await signIn("google", { redirect: false ,callbackUrl:'/'});
      router.refresh();
    };
  
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <div className="border rounded-3xl w-[300px] h-[350px] p-5 ">
          <p className="text-xl font-semibold text-center">Login</p>
          <div className="mt-8">
            <Button
              variant={"ghost"}
              className="w-full flex items-center gap-x-3 border "
              onClick={handleLogin}
            >
              <div className="w-6 h-6 relative">
                <Image
                  src={"/google-logo.png"}
                  fill
                  alt="google-logo"
                  className="object-contain"
                />
              </div>
              <p>Google</p>
            </Button>
          </div>
        </div>
      </div>
    );

};
  


export default LoginComponent