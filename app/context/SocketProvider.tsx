"use client";
import { ServiceMethods } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";
import { createContext, useContext, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

type SocketType = {
	socket: Socket | null;
	isConnected: boolean;
	friends: FriendsType[];
};

export type FriendsType = {
	id: string;
	username: string;
	nickname: string;
	profilePicture: string;
	status: {
		name: string;
		spaceId: string;
	};
};

const SocketContext = createContext<SocketType>({
	socket: null,
	isConnected: false,
	friends: [],
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const user = useUser();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [friends, setFriends] = useState<FriendsType[]>([]);
	const [refetchFriends, setRefetchFriends] = useState<Date>();
	const [isConnected, setIsConnected] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const newSocket = io("ws://localhost:8080", {
			autoConnect: false,
			reconnectionAttempts: 5,
			reconnectionDelay: 2000,
			auth: {
				token: user?.id,
			},
		});

		newSocket.on("connect", () => {
			console.log("Connected to WS server");
			setIsConnected(true);
		});

		newSocket.on("online_friends", () => {
			console.log("re-fetch friends m8");
			setRefetchFriends(new Date());
			setIsConnected(true);
		});

		newSocket.on("disconnect", () => {
			newSocket.emit("disconnect_uid", "userId");
			console.log("Disconnected from WS server");
			setIsConnected(false);
		});

		newSocket.connect();
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		async function getFriends() {
			if (!user) throw new Error("Error: User unavailable");
			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) {
				throw new Error("Error: No Access/Refresh Token available");
			}
			const serviceMethods = new ServiceMethods(accessToken, refreshToken);
			const userFriends = (await serviceMethods.fetchAllFriends()) as Awaited<
				Promise<FriendsType[]>
			>;
			setFriends(userFriends);
		}

		getFriends();
	}, [refetchFriends]);

	return (
		<SocketContext.Provider value={{ socket, isConnected, friends }}>
			{children}
		</SocketContext.Provider>
	);
};
