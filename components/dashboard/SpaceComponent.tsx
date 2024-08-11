import React from "react";
import Image from "next/image";
import { IoLink } from "react-icons/io5";

interface SpaceComponentProps {
  link?: string;
}

export const SpaceComponent: React.FC<SpaceComponentProps> = ({ link }) => {
  link = "link placeholder";

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-56">
        <Image
          src="/placeholder.jpg"
          alt="Space"
          layout="fill"
          objectFit="cover"
          priority
          className="rounded-xl"
        />
      </div>
      <div className="flex items-center mt-2">
        <p className="font-bold text-sm sm:text-base">Space Name</p>
        {link && <IoLink className="w-5 h-5 ml-2" />}
      </div>
    </div>
  );
};
