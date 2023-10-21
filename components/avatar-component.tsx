"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentProfile } from "@/lib/getCurrentProfile";
import { Loader } from "lucide-react";
import { Portfolio, Profile } from "@prisma/client";

type Props = { currentProfile: Profile };

const AvatarComponent = ({ currentProfile }: Props) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-x-2">
      <p className="text-sm capitalize font-semibold">
        {currentProfile?.name.split(' ')[0]}
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar>
            <AvatarImage src={currentProfile?.imageUrl as string} />
            <AvatarFallback>{currentProfile?.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={async() => {
             await signOut({ redirect: true, callbackUrl: "/" });
              router.refresh();
            }}
            className="cursor-pointer"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AvatarComponent;