import type React from "react";
import Avatar from "@components/ui/UserAvatar";
import { Slider } from "@/components/ui/slider";
import { IoMdVolumeHigh } from "react-icons/io";
import SelectCursor from "./SelectCursor";
import { useUser } from "@stackframe/stack";
import { useEffect, useState } from "react";
import { ServiceMethods } from "@lib/servicesMethods";

interface BottomBarProps {
	setSelectedCursor: (cursor: string) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ setSelectedCursor }) => {
	const [username, setUsername] = useState("");
	const [nickname, setnickname] = useState("");
	const [pfp, setPfp] = useState("");
	const user = useUser({ or: "redirect" });

	const fetch = async () => {
		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
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
			const result = await fetch();
			if (result) {
				setUsername(result.username);
				setnickname(result.nickname);
				setPfp(result.profilePicture)
			} else {
				setUsername("User1");
			}
		};
		fetchAndSetUserData();
	}, [user]);

	return (
		<div className="bg-gray-200 p-3 flex items-center justify-between">
			{/* <SelectCursor setSelectedCursor={setSelectedCursor} /> */}
			<div className="flex-1 flex justify-center ml-[32%] mb-[0.5%]">

				<Avatar username={username} nickname={nickname} icon={pfp}/>
				<Avatar username="User2" />
				<Avatar username="User3" />
				<Avatar username="User4" />
				<Avatar username="User5" />
				<Avatar username="User6" />
				<Avatar username="User7" />
				<Avatar username="User8" />
			</div>
			
			<div className="w-1/3 flex justify-end items-center space-x-2">
				<IoMdVolumeHigh size={24} />
				<Slider
					className="w-32 bg-gray-400 rounded"
					defaultValue={[33]}
					max={100}
					step={1}
				/>
			</div>
		</div>
	);
};

export default BottomBar;
