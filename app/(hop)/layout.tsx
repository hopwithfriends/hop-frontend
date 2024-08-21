import "@styles/globals.css";
// app/hop-layout.tsx
import SideBar from "@components/layout/LeftSidebarContainer";
import { SocketProvider } from "@app/context/SocketProvider";

export default function HopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SocketProvider>
			<SideBar>{children}</SideBar>
		</SocketProvider>
	);
}
