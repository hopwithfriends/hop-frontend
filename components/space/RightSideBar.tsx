import type React from "react";
import SpaceSettings from "./SpaceSettings";
import ChatContainer from "./ChatContainer";

interface RightSideBarProps {
	spaceId: string
}

const RightSideBar: React.FC<RightSideBarProps> = ({spaceId}) => {
	return (
		<div className="w-72 bg-hop-purple flex flex-col">
			<div className="flex-grow">
				<SpaceSettings />
			</div>
			<ChatContainer spaceId={spaceId}/>
		</div>
	);
};

export default RightSideBar;
