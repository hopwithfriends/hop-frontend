import React from "react";
import Link from "next/link";
import CreateSpaceButton from "@components/dashboard/CreateSpaceButton";
import { SpaceComponent } from "@components/dashboard/SpaceComponent";
import { CgProfile } from "react-icons/cg";
import InviteContainer from "./InviteContainer";

interface SpaceContainerProps {
  members: number;
}

const SpaceContainer: React.FC<SpaceContainerProps> = ({ members }) => {
  return (
    <main className="flex-1 p-6 relative">
      <h1 className="text-5xl font-bold mb-6 mt-5">My Spaces</h1>

      <div className="absolute top-10 right-11">
        <Link href="/profile">
          <CgProfile className="text-5xl cursor-pointer" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <CreateSpaceButton />
        <Link href="/space/id">
          <SpaceComponent members={members} />
        </Link>
        <Link href="/space/id">
          <SpaceComponent members={members} />
        </Link>
        <Link href="/space/id">
          <SpaceComponent members={members} />
        </Link>
      </div>

      <h1 className="text-5xl font-bold mb-5 mt-5">Recent Spaces</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="col-span-1">
          <InviteContainer />
        </div>

        <Link href="/space/id" className="col-span-1">
          <SpaceComponent members={members} />
        </Link>
        <Link href="/space/id" className="col-span-1">
          <SpaceComponent members={members} />
        </Link>
        <Link href="/space/id" className="col-span-1">
          <SpaceComponent members={members} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Link href="/space/id" className="col-span-1">
          <SpaceComponent members={members} />
        </Link>
        <Link href="/space/id" className="col-span-1">
          <SpaceComponent members={members} />
        </Link>
        <Link href="/space/id" className="col-span-1">
          <SpaceComponent members={members} />
        </Link>
        <Link href="/space/id" className="col-span-1">
          <SpaceComponent members={members} />
        </Link>
      </div>
    </main>
  );
};

export default SpaceContainer;
