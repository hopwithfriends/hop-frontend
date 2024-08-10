import React from "react";
import Link from "next/link";
import { Button } from "@components/ui/Button";
import CreateSpaceButton from "@components/dashboard/CreateSpaceButton";
import { SpaceComponent } from "@components/dashboard/SpaceComponent";

const SpaceContainer = () => {
  return (
    <main className="flex-1 p-6 relative">
      <h1 className="text-5xl font-bold mb-10 mt-5">My Spaces</h1>

      <CreateSpaceButton />

      <nav className="mb-6">
        <Link href="/space/id">
          <SpaceComponent />
        </Link>
        <Link href="/space/id">
          <SpaceComponent />
        </Link>
      </nav>

      <div className="absolute top-6 right-6">
        <Link href="/profile">
          <Button>Profile</Button>
        </Link>
      </div>
    </main>
  );
};

export default SpaceContainer;
