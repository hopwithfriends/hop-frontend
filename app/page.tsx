import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-700">Welcome to Our App</h1>
      <nav className="space-y-4">
        <Link
          href="/login"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors"
        >
          Log-In
        </Link>
        <Link
          href="/register"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors"
        >
          Register
        </Link>
        <Link
          href="/dashboard"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/friends"
          className="text-lg text-gray-700 hover:text-red-500 transition-colors"
        >
          Friends
        </Link>
        <Link
          href="/space/1"
          className="text-lg text-gray-700 hover:text-blue-500 transition-colors"
        >
          Space
        </Link>
      </nav>
    </div>
  );
}
