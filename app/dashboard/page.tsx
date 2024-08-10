import Link from 'next/link';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link href="/friends">Friends</Link>
        <br />
        <Link href="/profile">Profile</Link>
        <br />
        <Link href="/space">Space</Link>
        <br />
      </nav>
    </div>
  );
};

export default Dashboard;
