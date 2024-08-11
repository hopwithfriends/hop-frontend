import React from "react";
import InviteComponent from "./InviteComponent";
import ScrollBar from "../ui/SrollBar";

const InviteContainer: React.FC = () => {
  return (
    <div className="rounded-xl w-[24.1%] h-56 bg-gray-800 mt-2 pl-3">
      <h1 className="text-xl font-bold pt-2 mb-2">Invites</h1>
      <ScrollBar maxHeight="calc(100% - 3rem)">
        <InviteComponent />
        <InviteComponent />
        <InviteComponent />
        <InviteComponent />
        <InviteComponent />
        <InviteComponent />
      </ScrollBar>
    </div>
  );
};

export default InviteContainer;