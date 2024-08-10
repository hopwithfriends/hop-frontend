import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Our App</h1>
      <nav>
        <Link href="/sign-in">Log-In</Link> <br />
        <Link href="/sign-up">Register</Link> <br />
        <Link href="/dashboard">Dashboard</Link> <br />
        <Link href="/friends">Friends</Link> <br />
        <Link href="/space">Space</Link> <br />
      </nav>
    </div>
  );
}
