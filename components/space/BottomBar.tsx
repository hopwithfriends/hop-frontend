import type React from "react";
import Avatar from "@components/ui/UserAvatar";
import { Slider } from "@/components/ui/slider";
import { IoMdVolumeHigh } from "react-icons/io";
import SelectCursor from "./SelectCursor";

interface BottomBarProps {
	setSelectedCursor: (cursor: string) => void; 
}

const BottomBar: React.FC<BottomBarProps> = ({ setSelectedCursor }) => {
	return (
		<div className="bg-gray-200 p-4 flex items-center justify-between">
			<SelectCursor setSelectedCursor={setSelectedCursor} />
			<div className="flex-1 flex justify-center mr-[3%] mb-[0.5%]">
				<Avatar userId="currentUser" username="Current User" />
				<Avatar userId="currentUser" username="Current User" />
				<Avatar userId="currentUser" username="Current User" />
			</div>
			<div className="w-1/3 flex justify-end items-center space-x-2">
				<IoMdVolumeHigh size={24} />
				<Slider className="w-32" defaultValue={[33]} max={100} step={1} />
			</div>
		</div>
	);
};

export default BottomBar;
