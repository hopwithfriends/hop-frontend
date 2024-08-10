import LeftSidebar from "../../components/layout/LeftSidebar";
import SpaceContainer from "@components/dashboard/SpaceContainer";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-700 text-white">
      <LeftSidebar />
      <SpaceContainer />
    </div>
  );
};

export default Dashboard;
