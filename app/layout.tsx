import '@styles/globals.css';
import Link from 'next/link';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className= "flex justify-end bg-gray-100">
          <Link className="text-blue-500 hover:underline" href="/">Home</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
