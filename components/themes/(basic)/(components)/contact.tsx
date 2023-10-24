import { Portfolio } from "@prisma/client";
import { Facebook, Instagram, Linkedin, MessageSquareIcon, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  portfolio: Portfolio;
};

const ContactBasic = ({ portfolio }: Props) => {
  return (
    <div className="h-[200px]  mt-52 relative my-container  z-10 bg-black/90 rounded-t-3xl ">
      <Link
        href={"#contact"}
        className="text-4xl font-bold block text-center p-1 pt-5 text-white"
      >
        {" "}
        Contact
      </Link>

      <div className="mt-8 flex items-center flex-wrap justify-center gap-8 w-full">
        <div className="text-white text-xs flex items-center gap-x-2">
          <MessageSquareIcon className="w-4 h-4 " />
          <p className="text-white">{portfolio?.email}</p>
        </div>
        {!!portfolio.tel && (
          <div className="text-white text-xs flex items-center gap-x-2">
            <Phone className="w-4 h-4 " />
            <p className="text-white">{portfolio?.tel}</p>
          </div>
        )}
        {!!portfolio.facebook && (
          <div className="text-white text-xs flex items-center gap-x-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-white">
              {" "}
              <Facebook className="w-4 h-4  stroke-transparent fill-blue-500" />{" "}
            </span>

            <p className="text-white">{portfolio?.facebook}</p>
          </div>
        )}
        {!!portfolio.linkedin && (
          <div className="text-white text-xs flex items-center gap-x-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-white">
              {" "}
              <Linkedin className="w-4 h-4  stroke-none fill-blue-700" />{" "}
            </span>

            <p className="text-white">{portfolio?.linkedin}</p>
          </div>
        )}
        {!!portfolio.instagram && (
          <div className="text-white text-xs flex items-center gap-x-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-white">
              {" "}
              <Instagram className="w-4 h-4 stroke-black  " />{" "}
            </span>

            <p className="text-white">{portfolio?.instagram}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactBasic;
