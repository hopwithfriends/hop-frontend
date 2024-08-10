import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';

const LeftSidebar = () => {
    return (
      <div className="bg-gray-800 text-white p-4 w-64 h-screen">
        <Logo className="mb-8 mx-auto" />
        <nav className="mb-6">
          <Link href="/friends">
            <span className="text-blue-500 hover:underline">Friends</span>
          </Link>
          </nav>
        </div>
    );
  };
  
  export default LeftSidebar;
  