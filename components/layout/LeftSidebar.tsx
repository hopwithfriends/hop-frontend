import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';
import { Button } from '@components/ui/Button';
import OnlineFriendsContainer from './OnlineFriendsContainer';

const LeftSidebar = () => {
  return (
    <div className="bg-gray-400 text-white p-4 w-64 h-screen flex flex-col">
      <Logo className="mb-8 mx-auto" />
      <nav className="flex-1 flex flex-col items-center">
        <Link href="/friends">
          <Button className="w-52 mb-4">Friends</Button>
        </Link>
        <OnlineFriendsContainer />
      </nav>
    </div>
  );
};

export default LeftSidebar;
