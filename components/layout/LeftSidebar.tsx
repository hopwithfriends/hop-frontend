import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';
import { Button } from '@components/ui/Button';
import { FaUserFriends } from "react-icons/fa";
import OnlineFriendsContainer from './OnlineFriendsContainer';


const LeftSidebar = () => {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-gray-800 text-white p-6 w-80 h-screen flex flex-col shadow-xl rounded-r-lg">
      <Logo />
      <nav className="flex-1 flex flex-col items-center">
        <Link href="/friends">
        <div className="relative w-64 mt-1">
            <Button className="w-full flex items-center justify-center pr-10">
              <span className="ml-3">Friends</span>
            </Button>
            <FaUserFriends className="text-2xl text-black absolute mr-1 right-2 top-1/2 transform -translate-y-1/2" />
          </div>
        </Link>
        <p className="text-2xl font-bold text-gray-200 mt-5 mb-1">Online Friends</p>
        <OnlineFriendsContainer />
      </nav>
    </div>
  );
};

export default LeftSidebar;
