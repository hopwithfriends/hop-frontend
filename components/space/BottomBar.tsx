import React from "react";
import Avatar from "@components/ui/UserAvatar";
import { Slider } from "@/components/ui/slider";
import { IoMdVolumeHigh } from "react-icons/io";

const BottomBar = () => {
	return (
		<div className="bg-gray-200 p-4 flex items-center justify-between">
			<div className="w-1/3" />
			<div className="flex-1 flex justify-center">
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
