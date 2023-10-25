"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
    {
      label: "preview",
      url: `/preview/${params.portfolioId}`,
      active: pathname === `/preview/${params.portfolioId}`,
    },
  ];

  const router = useRouter();
const [toOpen, setToOpen] = useState(false)

const theActive = links.find((el)=>el.active === true)

  return (
    


    <Popover open={toOpen} onOpenChange={setToOpen}>
  <PopoverTrigger className="sm:hidden font-semibold capitalize flex items-center ">{theActive?.label}<ChevronDown className="ml-1 w-4 h-4 text-black" /></PopoverTrigger>
  <PopoverContent className="flex flex-col items-center p-1">
  {links.map((link) => (
          <span
            onClick={() => {router.push(link.url);setToOpen(false)}}
            key={link.label}
            className={cn(
              "text-zinc-600 capitalize transition p-3 hover:text-black rounded-full w-full text-center cursor-pointer hover:bg-neutral-50",
              link.active && "text-black font-semibold bg-neutral-100"
            )}
          >
            {link.label}
          </span>
        ))}
        </PopoverContent>
</Popover>

  

  );
};

export default MainnavLinkMobile;
