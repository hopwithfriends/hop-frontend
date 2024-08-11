import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { Button } from "@components/ui/Button";
import { FaUserFriends } from "react-icons/fa";
import OnlineFriendsContainer from "./OnlineFriendsContainer";

const LeftSidebar = () => {
	return (
		<div className="bg-gradient-to-b from-gray-600 to-gray-800 text-white p-6 w-80 h-screen flex flex-col shadow-xl rounded-r-lg">
			<Link href="/">
				<Logo />
			</Link>
			<nav className="flex-1 flex flex-col items-center">
				<Link href="/friends">
					<Button className="w-[270px] mt-1 flex items-center justify-center rounded-xl">
						<FaUserFriends className="text-2xl text-black mr-3" />
						<span>Friends</span>
					</Button>
				</Link>
				<p className="text-2xl font-bold text-gray-200 mt-5 mb-1">
					Online Friends
				</p>
				<OnlineFriendsContainer />
			</nav>
		</div>
	);
};

export default LeftSidebar;
