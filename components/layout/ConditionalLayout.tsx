"use client";

import { usePathname } from "next/navigation";
import LeftSidebar from "@components/layout/LeftSidebar";
import { useState } from "react";

interface Friend {
	id: string;
	nickname: string;
	username: string;
	profilePicture?: string;
	isOnline?: boolean;
	currentRoom?: string;
}

export default function ConditionalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const showSidebar = !["/login", "/register", "/"].includes(pathname);

	const [friends] = useState<Friend[]>([
		{
			id: "1",
			nickname: "John Doe",
			username: "johndoe",
			profilePicture: "/PFP.jpg",
			isOnline: true,
			currentRoom: "Gaming Lounge",
		},
		{
			id: "2",
			nickname: "Jane Smith",
			username: "janesmith",
			profilePicture: "/PFP.jpg",
			isOnline: true,
			currentRoom: "Movie Theater",
		},
		{
			id: "3",
			nickname: "Jane Smith",
			username: "janesmith",
			profilePicture: "/PFP.jpg",
			isOnline: true,
			currentRoom: "Movie Theater",
		},
		{
			id: "4",
			nickname: "Jane Smith",
			username: "janesmith",
			profilePicture: "/PFP.jpg",
			isOnline: true,
			currentRoom: "Movie Theater",
		},
		{
			id: "5",
			nickname: "Jane Smith",
			username: "janesmith",
			profilePicture: "/PFP.jpg",
			isOnline: true,
			currentRoom: "Movie Theater",
		},
		{
			id: "6",
			nickname: "Alice Johnson",
			username: "alicej",
			profilePicture: "/PFP.jpg",
			isOnline: false,
		},
	]);

	return (
		<div className="flex h-screen">
			{showSidebar && <LeftSidebar friends={friends} />}
			<main className="flex-1 overflow-auto">{children}</main>
		</div>
	);
}
