'use client'

import Image from "next/image"
import Link from "next/link"

type Props = {
    image:string | null,
    experience:boolean,
    projects:boolean,
    title:string | null
}

const HeaderBasic = ({image,projects,experience,title}: Props) => {
  return (
    <header className=" h-16 fixed top-0 w-full bg-black z-50">
        <div className="my-container flex items-center justify-center  sm:justify-between w-full h-full flex-col sm:flex-row ">
          {!!image ? (
            <Link
            scroll
            href={"#home"}>
              <div className="w-12 h-12 relative bg-white rounded-full overflow-hidden ">
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
            href={"#home"}>
              <span className="font-bold text-white text-md  md:text-xl">
                {title}
              </span>
            </Link>
          )}

          <nav className="flex items-center sm:gap-x-8 gap-x-2   md:gap-x-20 text-xs md:text-base text-white">
            <Link
            scroll
              className=" font-semibold transition p-1 text-xs sm:text-md md:text-base"
              href={"#home"}
            >
              Home
            </Link>
            {projects && (
              <Link
              scroll
                className=" font-semibold transition p-1 text-xs sm:text-md md:text-base"
                href={"#projects"}
              >
                Projects
              </Link>
            )}
            {experience && (
              <Link 
              scroll
                className=" font-semibold transition p-1 text-xs sm:text-md md:text-base"
                href={"#experience"}
              >
                Experience
              </Link>
            )}
                <Link 
              scroll
                className=" font-semibold transition p-1 text-xs sm:text-md md:text-base"
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