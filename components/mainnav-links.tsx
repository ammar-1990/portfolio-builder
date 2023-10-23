"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      label: "preview",
      url: `/preview/${params.portfolioId}`,
      active:
        pathname ===
        `/preview/${params.portfolioId}`,
    },
   
  ];

  return (
    <div className=" items-center gap-x-7 hidden sm:flex">
      {links.map((link) => (
        <Link
          className={cn(
            "text-zinc-600 capitalize transition hover:text-black",
            link.active && "text-black font-semibold"
          )}
          key={link.label}
          href={link.url}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainnavLinks;
