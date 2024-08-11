import React from "react";
import Link from "next/link";
import CreateSpaceButton from "@components/dashboard/CreateSpaceButton";
import { SpaceComponent } from "@components/dashboard/SpaceComponent";
import { CgProfile } from "react-icons/cg";

const SpaceContainer = () => {
  return (
    <main className="flex-1 p-6 relative">
      <h1 className="text-5xl font-bold mb-10 mt-5">My Spaces</h1>

      <div className="absolute top-10 right-11">
        <Link href="/profile" passHref>
          <CgProfile className="text-5xl cursor-pointer" /> 
        </Link>
      </div>

      <div className="mb-6 flex space-x-4">
        <CreateSpaceButton />
        <nav className="flex space-x-4">
          <Link href="/space/id" passHref>
            <div>
              <SpaceComponent />
            </div>
          </Link>
          <Link href="/space/id" passHref>
            <div>
              <SpaceComponent />
            </div>
          </Link>
        </nav>
      </div>
    </main>
  );
};

export default SpaceContainer;
