'use client'

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

type Props = {
    image:string | null,
    experience:boolean,
    projects:boolean,
    title:string | null,
    preview?:boolean,
    noLink?:boolean
}

const HeaderBasic = ({image,projects,experience,title,preview,noLink}: Props) => {
  return (
    <header className={cn(" sm:h-16 h-24 fixed top-0 w-full bg-black z-50 ",preview && 'sticky')}>
        <div className="my-container flex items-center justify-center gap-y-2  sm:justify-between w-full h-full flex-col sm:flex-row ">
          {!!image ? (
            <Link
            scroll
            href={noLink ? '' :"#home"}>
              <div className="w-12 h-12 relative  rounded-full overflow-hidden ">
                <Image
                  fill
                  src={image as string}
                  alt="logo"
                  className="object-contain "
                />
              </div>
            </Link>
          ) : (
            <Link 
            scroll
            href={noLink ? '' : "#home"}>
              <span className="font-bold text-white text-md  md:text-xl">
                {title}
              </span>
            </Link>
          )}

          <nav className={cn("flex items-center sm:gap-x-8 gap-x-2   md:gap-x-20 text-xs md:text-base text-white",preview && 'md:gap-x-2 lg:gap-x-2')}>
            <Link
            scroll
            onClick={(e)=>{
              noLink && e.preventDefault()
            }} 
              className={cn(" font-semibold transition p-1 text-xs sm:text-md md:text-base",preview && 'text-xs sm:text-xs md:text-xs')}
              href={"#home"}
            >
              Home
            </Link>
            {projects && (
              <Link
              onClick={(e)=>{
                noLink && e.preventDefault()
              }} 
              scroll
                className={cn(" font-semibold transition p-1 text-xs sm:text-md md:text-base",preview && 'text-xs sm:text-xs md:text-xs')}
                href={"#projects"}
              >
                Projects
              </Link>
            )}
            {experience && (
              <Link 
              onClick={(e)=>{
                noLink && e.preventDefault()
              }} 
              scroll
                className={cn(" font-semibold transition p-1 text-xs sm:text-md md:text-base",preview && 'text-xs sm:text-xs md:text-xs')}
                href={"#experience"}
              >
                Experience
              </Link>
            )}
                <Link 
                  onClick={(e)=>{
                    noLink && e.preventDefault()
                  }} 
              scroll
                className={cn(" font-semibold transition p-1 text-xs sm:text-md md:text-base",preview && 'text-xs sm:text-xs md:text-xs')}
                href={"#contact"}
              >
                Contact
              </Link>
          </nav>
        </div>
      </header>
  )
}

export default HeaderBasic 