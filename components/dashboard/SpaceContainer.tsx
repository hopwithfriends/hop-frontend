import React from "react";
import Link from "next/link";
import { Button } from "@components/ui/Button";
import CreateSpaceButton from "@components/dashboard/CreateSpaceButton";
import { SpaceComponent } from "@components/dashboard/SpaceComponent";

const SpaceContainer = () => {
  return (
    <main className="flex-1 p-6 relative">
      <h1 className="text-5xl font-bold mb-10 mt-5">My Spaces</h1>

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
