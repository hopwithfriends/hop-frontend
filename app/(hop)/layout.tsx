import "@styles/globals.css";
import ConditionalLayout from "@components/layout/ConditionalLayout";

export default function HopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="m-0">
				<ConditionalLayout>{children}</ConditionalLayout>
			</body>
		</html>
	);
}
