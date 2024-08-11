import React from "react";
import Image from "next/image";
import { IoLink } from "react-icons/io5";

interface SpaceComponentProps {
  link?: string;
  members: number;
  screen: string;
  pfp: string;
}

export const SpaceComponent: React.FC<SpaceComponentProps> = ({
  link,
  members,
  screen,
  pfp,
}) => {
  link = "link placeholder";
  members = 4;
  screen = "/placeholder.jpg"
  pfp = "/PFP.jpg";

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-56 rounded-2xl border-4 border-gray-800 ">
        <Image
          src={screen}
          alt="Space"
          layout="fill"
          objectFit="cover"
          priority
          className="rounded-xl"
        />
      </div>
      <div className="flex items-center text-sm sm:text-base">
        <div className= "pr-60">
          <div className="flex items-center">
            <p className="font-bold">Space Name</p>
            {link && <IoLink className="w-5 h-5 ml-2 text-gray-500" />}
          </div>
        </div>
        <p className="font-semibold mr-1">{members}</p>
        <div className="relative w-6 h-6">
          <Image
            src={pfp}
            alt="Member Icon"
            layout="fill"
            objectFit="cover"
            className="rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
};
