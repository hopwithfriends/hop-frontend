import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';
import { Button } from '@components/ui/Button';
import OnlineFriendsContainer from './OnlineFriendsContainer';

const LeftSidebar = () => {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-gray-800 text-white p-6 w-80 h-screen flex flex-col shadow-xl rounded-r-lg">
      <Logo />
      <nav className="flex-1 flex flex-col items-center">
        <div>
        <Link href="/profile" passHref>
          <Button className= "w-32 font-extrabold">Profile</Button>
        </Link>
        <Link href="/friends">
          <Button className="w-32 mt-2 ml-2 font-extrabold">
            Friends
          </Button>
        </Link>
        </div>
        <p className="text-2xl font-bold text-gray-200 mt-7 mb-1">Online Friends</p>
        <OnlineFriendsContainer />
      </nav>
    </div>
  );
};

export default LeftSidebar;
