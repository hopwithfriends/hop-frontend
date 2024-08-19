"use client";

import { usePathname } from "next/navigation";
import LeftSidebar from "@components/layout/LeftSidebar";

export default function ConditionalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const pathname = usePathname();
	// const showSidebar = ![
	// 	"/",
	// 	"/login",
	// 	"/register",
	// 	"/handler/sign-up",
	// 	"/handler/sign-in",
	// ].includes(pathname);

	return (
		<div className="flex h-screen">
			<LeftSidebar friends={[]} />
			<main className="flex-1 overflow-auto">{children}</main>
		</div>
	);
}
