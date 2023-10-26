"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

type Props = {};

const MainnavLinkMobile = (props: Props) => {
  const params = useParams();
  const pathname = usePathname();

  const links = [
    {
      label: "Main",
      url: `/dashboard/${params.profileId}/portfolio/${params.portfolioId}`,
      active:
        pathname ===
        `/dashboard/${params.profileId}/portfolio/${params.portfolioId}`,
    },
    {
      label: "projects",
      url: `/dashboard/${params.profileId}/portfolio/${params.portfolioId}/projects`,
      active:
        pathname ===
        `/dashboard/${params.profileId}/portfolio/${params.portfolioId}/projects`,
    },
    {
      label: "experience",
      url: `/dashboard/${params.profileId}/portfolio/${params.portfolioId}/experience`,
      active:
        pathname ===
        `/dashboard/${params.profileId}/portfolio/${params.portfolioId}/experience`,
    },
   
   
  ];

  return (
    <div className=" items-center  flex justify-between px-6 sm:hidden h-12 border-b ">
      {links.map((link) => (
        <Link
          className={cn(
            "text-zinc-600 capitalize transition text-xs hover:text-black",
            link.active && "text-black font-semibold border-b border-black h-full flex items-center justify-center "
          )}
          key={link.label}
          href={link.url}
        >
          {link.label}
        </Link>
      ))}
        <Link href={`/preview/${params.portfolioId}`} className=""><Button variant={'default'} size={'sm'} className="text-xs" >Preivew</Button></Link>
    </div>
  );
};

export default MainnavLinkMobile;
