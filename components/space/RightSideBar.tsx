import type React from "react";
import SpaceSettings from "./SpaceSettings";
import ChatContainer from "./ChatContainer";

const RightSideBar: React.FC = () => {
	return (
		<div className="w-72 bg-hop-purple flex flex-col">
			<div className="flex-grow">
				<SpaceSettings />
			</div>
			<ChatContainer/>
		</div>
	);
};

export default RightSideBar;
