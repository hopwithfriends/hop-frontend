"use client";

import { useSocket } from "@app/context/SocketProvider";
import LeftSidebar from "@components/layout/LeftSidebar";

interface Friend {
	id: string;
	nickname: string;
	username: string;
	profilePicture?: string;
	isOnline?: boolean;
	currentRoom?: string;
}

export default function SideBar({
	children,
}: {
	children: React.ReactNode;
}) {
	const { friends } = useSocket();
	return (
		<div className="flex h-screen">
			<LeftSidebar friends={friends} />
			<main className="flex-1 overflow-auto">{children}</main>
		</div>
	);
}
