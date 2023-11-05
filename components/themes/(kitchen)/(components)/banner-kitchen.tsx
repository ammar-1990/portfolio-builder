import React from "react";

type Props = {
  image: string;
};

const BannerKitchen = ({ image }: Props) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed'
      }}
      className="h-80 md:h-[400px] relative flex items-center px-3  max-w-[1300px] mx-auto"
    >
     <div className="border-[2px] border-white absolute bottom-3 left-3 flex items-center">

        <p className="p-3 sm:px-12 px-8 border-r-[2px] border-white text-white  uppercase text-lg sm:text-5xl font-bold">best</p>
        <p className="p-3 sm:px-12 px-8 uppercase sm:text-5xl text-lg font-bold text-white">dishes</p>
     </div>
     <div className="absolute w-full  left-0 flex items-center justify-between h-10  z-10">
        <span className="bg-white h-[1px] rounded-md w-32" />
        <span className="bg-white h-[1px] rounded-md w-32" />
     </div>
    </div>
  );
};

export default BannerKitchen;
