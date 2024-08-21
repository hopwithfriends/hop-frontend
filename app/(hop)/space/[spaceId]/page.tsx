"use client";

import { useParams } from "next/navigation";
import VncDisplay from "@components/space/FetchFlyURL";
import { useUser } from "@stackframe/stack";
import BottomBar from "@components/space/BottomBar";
import RightSideBar from "@components/space/RightSideBar";
import { ServiceMethods } from "@lib/servicesMethods";
import { useState, useEffect, useRef } from "react";
import { useSocket } from "@app/context/SocketProvider";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import dotenv from "dotenv";
dotenv.config();
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

const SpacePage: React.FC = () => {
	const params = useParams();
	const spaceId = params.spaceId as string;
	const [username, setUsername] = useState("");
	const [pfp, setPfp] = useState("");
	const [nickname, setNickname] = useState("");
	const [otherUsers, setOtherUsers] = useState<Users>({});
	const user = useUser({ or: "redirect" });
	const { socket } = useSocket();

	const fetchIt = async () => {
		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) return null;
			const serviceMethods = new ServiceMethods(accessToken, refreshToken);
			const result = await serviceMethods.fetchUser();
			return result;
		} catch (error) {
			console.error("Error during submission:", error);
		}
	};

	function getRandomInt(min: number, max: number) {
		const minimum = Math.ceil(min);
		const maximum = Math.floor(max);
		return Math.floor(Math.random() * (maximum - minimum + 1)) + min;
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		socket?.emit("space_join", spaceId);
		const fetchAndSetUserData = async () => {
			const result = await fetchIt();
			if (result) {
				setUsername(result.username);
				setPfp(result.profilePicture);
				setNickname(result.nickname);
			} else {
				const randNum: number = getRandomInt(1, 100);
				setUsername(`user${randNum}`);
			}
		};
		fetchAndSetUserData();
		return () => {
			socket?.emit("space_leave", spaceId);
		};
	}, [user]);

	const WS_URL = `wss://hop-websocket1-76a542d0c47b.herokuapp.com?username=${encodeURIComponent(username)}&pfp=${encodeURIComponent(pfp)}&nickname=${encodeURIComponent(nickname)}`;

	const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
		shouldReconnect: () => true,
		reconnectAttempts: 100,
		share: true,
	});


	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const timeoutId = setInterval(() => {
			sendJsonMessage("");
			if (lastJsonMessage) {
				const users = lastJsonMessage as Users;
				const seenUsernames = new Set<string>();

				const filteredUsers = Object.keys(users).reduce<Users>((acc, uuid) => {
					const currentUser = users[uuid];
					if (
						currentUser.username !== username &&
						!seenUsernames.has(currentUser.username) &&
						currentUser.username !== "" &&
						currentUser.pfp
					) {
						seenUsernames.add(currentUser.username);

						acc[uuid] = {
							username: currentUser.username,
							nickname: currentUser.nickname,
							pfp: currentUser.pfp,
							state: currentUser.state,
						};
					}
					return acc;
				}, {});
				setOtherUsers(filteredUsers);
			}
		}, 5);
		return () => clearTimeout(timeoutId);
	}, [lastJsonMessage, username]);

	return (
		<>
			<div className="relative flex h-screen flex-col overflow-hidden">
				<div className="flex flex-grow overflow-hidden relative">
					<main className="flex-grow flex flex-col relative ">
						<div className="relative flex-grow flex items-center justify-center">
							<VncDisplay spaceId={spaceId} />
						</div>
						<BottomBar otherUsers={otherUsers} />
					</main>
					<RightSideBar spaceId={spaceId} />
				</div>
			</div>
		</>
	);
};

export default SpacePage;
