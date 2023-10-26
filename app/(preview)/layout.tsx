import TipTool from "@/components/tip-tool";
import { getCurrentProfile } from "@/lib/getCurrentProfile";
import { ForwardIcon, SendToBack } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = { children: React.ReactNode };

const PreviewLayout = async ({ children }: Props) => {

  return (
    <div className="">
   
      {children}
    </div>
  );
};

export default PreviewLayout;
