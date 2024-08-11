import React from "react";
import Image from "next/image";
import { IoLink } from "react-icons/io5";

interface SpaceComponentProps {
  link?: string;
}

export const SpaceComponent: React.FC<SpaceComponentProps> = ({ link }) => {
  link = "link placeholder";

  return (
    <>
      <div>
        <Image
          src="/placeholder.jpg"
          alt="Space"
          objectFit="contain"
          width={100}
          height={100}
          priority
          className="rounded-xl w-[90%] h-44"
        />
      </div>
      <div className="flex ml-2 mt-1">
        <p className="font-bold">Space Name</p>
        {link && <IoLink className="w-6 h-7 ml-2" />}
      </div>
    </>
  );
};
