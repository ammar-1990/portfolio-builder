"use client";

import React from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { Portfolio } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/hooks/modal-hook";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  portfolios: Portfolio[];
};

const SideBar = ({ portfolios }: Props) => {


  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();
  return (
    <div className="h-[450px] bg-gray-1 rounded-2xl border w-full p-3 flex flex-col  ">
      <h2 className="text-lg font-semibold text-center">My Portfolios</h2>

      <ScrollArea className="h-[300px] border-0 w-full mt-3 rounded-md   p-4">
        {portfolios.map((portfolio) => (
          <div
            onClick={() =>
              router.push(
                `/dashboard/${params.profileId}/portfolio/${portfolio.id}`
              )
            }
            className={cn(
              "p-4 rounded-md text-zinc-800  cursor-pointer mb-1 capitalize",
              params.portfolioId === portfolio.id
                ? "bg-gray-100 font-semibold"
                : "hover:bg-gray-50"
            )}
            key={portfolio.id}
          >
            {portfolio.name}
          </div>
        ))}
      </ScrollArea>

      <Button
        className="mt-auto"
        onClick={() => {
          onOpen("initial-modal", { refresh: true });
        }}
      >
        Create new portfolio
        <PlusCircle className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default SideBar;
