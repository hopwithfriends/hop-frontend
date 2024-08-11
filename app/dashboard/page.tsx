import LeftSidebar from "../../components/layout/LeftSidebar";
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
  link = "link placeholder";
  members = 4;
  screen = "/placeholder.jpg"
  pfp = "/PFP.jpg";

  return (
    <div className="flex bg-gray-700 text-white">
      <SpaceContainer screen={screen} pfp={pfp} link={link} members={members} />
    </div>
  );
};

export default Dashboard;
