import type React from "react";
import { Slider } from "@/components/ui/slider";
import { IoMdVolumeHigh } from "react-icons/io";
import { IoMdVolumeMute } from "react-icons/io";
import { useUser } from "@stackframe/stack";
import { useEffect, useState } from "react";
import { ServiceMethods } from "@lib/servicesMethods";
import { AnimatedTooltip } from "@components/ui/animated-tooltip";
interface UserState {
	username: string;
	color: string;
	cursor: string;
	x: number;
	y: number;
}
interface User {
	username: string;
	nickname: string;
	pfp: string;
	state: UserState;
}
interface Users {
	[uuid: string]: User;
}
interface BottomBarProps {
	otherUsers: Users;
}

interface Item {
	id: number;
	name: string;
	designation: string;
	image: string;
}

const BottomBar: React.FC<BottomBarProps> = ({ otherUsers }) => {
	const user = useUser({ or: "redirect" });
	const [fetchedUser, setFetchedUser] = useState<Item | null>(null);
	const [volume, setVolume] = useState<number>(33);

	const fetchIt = async () => {
		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) return;
			const serviceMethods = new ServiceMethods(accessToken, refreshToken);
			const result = await serviceMethods.fetchUser();
			return result;
		} catch (error) {
			console.error("Error during submission:", error);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchAndSetUserData = async () => {
			const result = await fetchIt();
			if (result) {
				setFetchedUser({
					id: 1,
					name: result.nickname,
					designation: result.username,
					image: result.profilePicture,
				});
			}
		};
		fetchAndSetUserData();
	}, [user]);

	const convertUsersToItems = (otherUsers: Users): Item[] => {
		return Object.keys(otherUsers).map((uuid, index) => {
			const user = otherUsers[uuid];
			return {
				id: index + 2,
				name: user.nickname,
				designation: user.username,
				image: user.pfp,
			};
		});
	};

	const items = fetchedUser
		? [fetchedUser, ...convertUsersToItems(otherUsers)]
		: convertUsersToItems(otherUsers);

	return (
		<div className="p-3 flex items-center justify-between">
			<div className="flex-1 flex justify-center ml-[32%] mb-[0.5%]">
				<AnimatedTooltip items={items} />
			</div>

			<div className="w-1/3 flex items-center justify-end mr-3">
				<div className="flex items-center pr-[10px]">
					{volume === 0 ? (
						<IoMdVolumeMute size={24} />
					) : (
						<IoMdVolumeHigh size={24} />
					)}
					<div className="relative w-32">
						<Slider
							className="w-full bg-gray-400 rounded"
							defaultValue={[33]}
							max={100}
							step={1}
							onValueChange={(value: number[]) => {
								setVolume(value[0]);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BottomBar;
