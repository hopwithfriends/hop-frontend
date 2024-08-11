import LeftSidebar from "@components/layout/LeftSidebar";
import "@styles/globals.css";
import ConditionalLayout from "@components/layout/ConditionalLayout";

export default function RootLayout({
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
