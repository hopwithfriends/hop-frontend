import React from "react";
import SpaceSettings from "./SpaceSettings";
import ChatContainer from "./ChatContainer";

const RightSideBar = () => {
	return (
		<div className="w-64 bg-gray-600 border-l border-gray-300 flex flex-col">
			<div className="flex-grow">
				<SpaceSettings />
			</div>
			<ChatContainer />
		</div>
	);
};

export default RightSideBar;
