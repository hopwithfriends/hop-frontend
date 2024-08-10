import Link from "next/link";
import LeftSidebar from "../../components/layout/LeftSidebar";
import { Button } from "@components/ui/Button";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-700 text-white">
      <LeftSidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <nav className="mb-6">
          <Link href="/profile">
            <Button>
              Profile
            </Button>
          </Link>
          <br />
          <Link href="/space/id">
            <Button className="mt-1">
              Space
            </Button>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default Dashboard;
