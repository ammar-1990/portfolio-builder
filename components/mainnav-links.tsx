"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = {};

const MainnavLinks = (props: Props) => {
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
    {
      label: "settings",
      url: `/dashboard/${params.profileId}/portfolio/${params.portfolioId}/settings`,
      active:
        pathname ===
        `/dashboard/${params.profileId}/portfolio/${params.portfolioId}/settings`,
    },
 
   
  ];

  return (
    <div className=" items-center gap-x-4 md:gap-x-7 hidden sm:flex h-full">
      {links.map((link) => (
        <Link
          className={cn(
            "text-zinc-600 capitalize transition hover:text-black  text-xs md:text-base",
            link.active && "text-black font-bold border-b border-black h-full flex items-center justify-center  "
          )}
          key={link.label}
          href={link.url}
        >
          {link.label}
        </Link>
      ))}
            <Link href={`/preview/${params.portfolioId}`} className=""><Button className=" text-xs" variant={'default'} size={'sm'}>Preivew</Button></Link>
            <Link href={`/dashboard/${params.profileId}/portfolio/${params.portfolioId}/resume`} className=""><Button className=" text-xs" variant={'default'} size={'sm'}>Resume</Button></Link>
    </div>
  );
};

export default MainnavLinks;
