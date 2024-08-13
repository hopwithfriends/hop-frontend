"use client"

import type React from 'react';
import SpaceContainer from "@components/dashboard/SpaceContainer";
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

  // GET USERDATA on page load!
  const realUsername = "User" // for testing 

  link = "link placeholder";
  members = 4;
  screen = "/placeholder.jpg"
  pfp = "/PFP.jpg";

  return (
    <div className="flex bg-gray-700 text-white h-screen">
      <SpaceContainer screen={screen} pfp={pfp} link={link} members={members} realUsername={realUsername} />
    </div>
  );
};

export default Dashboard;