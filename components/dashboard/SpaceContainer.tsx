import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import CreateSpaceButton from "@components/dashboard/CreateSpaceButton";
import { SpaceComponent } from "@components/dashboard/SpaceComponent";
import InviteContainer from "./InviteContainer";
import UserSpaces from "./UserSpaces";
import UserMemberSpaces from "./UserMemberSpaces";
import Image from "next/image";

interface SpaceContainerProps {
	link?: string;
	members: number;
	screen: string;
	pfp: string;
	realUsername: string;
}

const SpaceContainer: React.FC<SpaceContainerProps> = ({
	link,
	members,
	screen,
	pfp,
	realUsername,
}) => {
	return (
		<main className="flex-1 p-6 relative">
			<h1 className="text-5xl font-bold mb-6 mt-5">
				{`${realUsername}'s`} Spaces
			</h1>
			<div className="absolute top-10 right-11">
				<Link href="/profile">
					<div className="flex items-center gap-2 bg-hop-purple-300 rounded-lg py-3 px-4">
						<Image
							src={pfp}
							alt="Profile"
							width={30}
							height={30}
							className="rounded-full"
						/>
						<h2 className="text-xl font-bold">{realUsername}</h2>
					</div>
				</Link>
			</div>

			<div className="">
				<UserSpaces />
			</div>

			<h1 className="text-5xl font-bold mb-5 mt-20">Recent Spaces</h1>
			<div className="">
				<UserMemberSpaces />
			</div>
		</main>
	);
};

export default SpaceContainer;
