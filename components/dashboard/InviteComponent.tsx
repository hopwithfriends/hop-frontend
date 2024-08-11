import React from "react";
import { IoCheckbox } from "react-icons/io5";
import { FaRectangleXmark } from "react-icons/fa6";
interface InviteProps {
  spaceName: string;
  username: string;
}

const InviteComponent: React.FC<InviteProps> = ({spaceName, username}) => {

  username = "Username"
  spaceName= "Space name"
  
  return (
    <div className="w-[99%] mt-2 mb-3 bg-gray-700 rounded-xl h-12 flex items-center px-2">
      <div className="w-10 h-10 bg-gray-500 rounded-full flex-shrink-0"></div>
      <div className="flex-1 flex flex-col justify-center ml-3">
        <div className="flex items-center space-x-2">
          <div className="text-white font-semibold text-sm">{username}</div>
        </div>
        <div className="text-gray-400 text-xs">{spaceName}</div>
      </div>
      <button>
        <IoCheckbox className="text-2xl mr-1" />
      </button>

      <button>
        <FaRectangleXmark className="text-[22px]" />
      </button>
    </div>
  );
};

export default InviteComponent;
