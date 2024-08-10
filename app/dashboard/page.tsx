import Link from 'next/link';
import LeftSidebar from "../../components/layout/LeftSidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      
      <LeftSidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <nav className="mb-6">
          <Link href="/friends">
            <span className="text-blue-500 hover:underline">Friends</span>
          </Link>
          <br />
          <Link href="/profile">
            <span className="text-blue-500 hover:underline">Profile</span>
          </Link>
          <br />
          <Link href="/space">
            <span className="text-blue-500 hover:underline">Space</span>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default Dashboard;
