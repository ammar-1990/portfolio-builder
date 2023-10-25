'use client'

import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginTab from "./login-tab";

type Props = {}

const LoginComponent = (props: Props) => {
 

  
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <div className="border rounded-3xl w-[300px] h-[350px] p-5 ">
          <p className="text-xl font-semibold text-center">Login</p>
          <div className="mt-8 space-y-4">
          <LoginTab title="google" provider="google" img="/google-logo.png" />
      <LoginTab title="github" provider="github" img="/github-logo.png" />
          </div>
        </div>
      </div>
    );

};
  


export default LoginComponent