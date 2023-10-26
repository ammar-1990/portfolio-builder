"use client";
import { Button } from "@/components/ui/button";
import { Fullscreen } from "lucide-react";
import React, { useState } from "react";

export default function SettingsLayout({
  children,
  example,
}: {
  children: React.ReactNode;
  example: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  console.log(show);
  return (
    <div className="w-full ">
      <div className="flex gap-x-4 justify-between flex-col lg:flex-row gap-8">
        {children}
        <div className="relative w-full max-w-[500px] h-[550px] border rounded-lg hover:border-gray-400 transition overflow-hidden  self-center ">
          <div className="w-full h-full overflow-y-scroll relative z-10 noScroll ">
            {example}
          </div>
          {!show && (
            <button
            type="button"
              className="rounded-full bg-white text-black flex items-center justify-center p-0 w-10 h-10 border-black absolute border hover:scale-110 active:scale-95 transition bottom-5 right-5 z-30"
              onClick={() => setShow(true)}
            >
              <Fullscreen className="w-6 h-6 " />
            </button>
          )}
        </div>
      </div>

      {show && (
        <>
          <div className=" absolute top-0 left-0  w-full z-50">{example}</div>{" "}
          <Button
            className="fixed right-3 bottom-3 z-50"
            onClick={() => setShow(false)}
          >
            Hide
          </Button>
        </>
      )}
    </div>
  );
}
