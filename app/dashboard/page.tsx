"use client"

import type React from 'react';
import SpaceContainer from "@components/dashboard/SpaceContainer";
import { useSearchParams } from 'next/navigation';

interface SpaceContainerProps {
  link?: string;
  members: number;
  screen: string;
  pfp: string;
}

const Dashboard: React.FC<SpaceContainerProps> = ({
  link,
  members,
  screen,
  pfp,
}) => {
  const searchParams = useSearchParams();
  const realUsername = searchParams.get('username') || "user";

  console.log(realUsername);

  link = "link placeholder";
  members = 4;
  screen = "/placeholder.jpg"
  pfp = "/PFP.jpg";

  return (
    <div className="flex bg-gray-700 text-white">
      <SpaceContainer screen={screen} pfp={pfp} link={link} members={members} realUsername={realUsername} />
    </div>
  );
};

export default Dashboard;