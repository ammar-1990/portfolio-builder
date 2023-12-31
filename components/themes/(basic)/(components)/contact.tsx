import { Portfolio } from "@prisma/client";
import { Facebook, Instagram, Linkedin, Mail, MessageSquareIcon, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  portfolio: Portfolio;
  noLink?:boolean
};

const ContactBasic = ({ portfolio,noLink }: Props) => {
  return (
    <div className="min-h-[100px]  mt-52 relative   z-10 bg-black/90  ">
      <Link
      onClick={(e)=> noLink && e.preventDefault()}
        href={"#contact"}
        className="md:text-2xl font-bold block text-center p-1 pt-5 text-white text-xl"
      >
        {" "}
        Contact
      </Link>

      <div className="mt-2 flex items-center flex-wrap justify-center gap-8 w-full">
        <Link href={`mailto:${portfolio.email}`} >
        <div className="text-white text-xs flex items-center gap-x-2">
          <Mail className="w-4 h-4 " />
          <p className="text-white">{portfolio?.email}</p>
        </div>
        </Link>
        {!!portfolio.tel && (
          <div className="text-white text-xs flex items-center gap-x-2">
            <Phone className="w-4 h-4 " />
            <p className="text-white">{portfolio?.tel}</p>
          </div>
        )}
        {!!portfolio.facebook && (
         <Link href={portfolio.facebook} title={portfolio.facebook} target="_blank"><div className="text-white text-xs flex items-center gap-x-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-white">
              {" "}
              <Facebook className="w-4 h-4  stroke-transparent fill-blue-500" />{" "}
            </span>

           
          </div>
          </Link> 
        )}
        {!!portfolio.linkedin && (
          <Link href={portfolio?.linkedin} target="_blank" title={portfolio?.linkedin}>
          <div className="text-white text-xs flex items-center gap-x-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-white">
              {" "}
              <Linkedin className="w-4 h-4  stroke-none fill-blue-700" />{" "}
            </span>

         
          </div>
          </Link>
        )}
        {!!portfolio.instagram && (
          <Link href={portfolio?.instagram} target="_blank" title={portfolio?.instagram}>
          <div className="text-white text-xs flex items-center gap-x-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-white">
              {" "}
              <Instagram className="w-4 h-4 stroke-black  " />{" "}
            </span>

          
          </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ContactBasic;
