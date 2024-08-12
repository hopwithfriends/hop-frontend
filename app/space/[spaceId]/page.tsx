"use client";

import React, { useState } from "react";
import RightSideBar from "@components/space/RightSideBar";
import BottomBar from "@components/space/BottomBar";
import CursorContainer from "@components/space/CursorContainer";
import SetNickname from "@components/space/SetNickname";

const handleClick = () => {
	console.log("clicked");
};

/*
<iframe
						className="absolute inset-0 w-full h-full z-10"
						title="vnc"
						src="https://vnc-socket-2.fly.dev/"
					/>

					 <button
                  type="button"
                  className="bg-black text-white ml-20 pointer-events-auto"
                  onClick={handleClick}
                >
                  Click
                </button>
*/

const SpacePage = () => {
	const [username, setUsername] = useState("");
	const [color, setColor] = useState("");
	const [zaxis, setZaxis] = useState(40);

	const handleClick = () => {
		console.log("clicked");
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<main className="flex-grow flex flex-col overflow-hidden relative">
				<div className="relative flex-grow">
					{username ? (
						<CursorContainer username={username} color={color} />
					) : (
						<SetNickname onSubmit={setUsername} setColorProp={setColor} />
					)}
					<button
						type="button"
						className="bg-black text-white ml-40 w-30 h-12 z-30"
						onClick={handleClick}
					>
						Click
					</button>
				</div>
				<BottomBar />
			</main>
			<RightSideBar />
		</div>
	);
};

export default SpacePage;
