import Link from "next/link";

const FriendsPage = () => {
	return (
		<div>
			<h1>Friends</h1>
			<Link className="text-blue-500 hover:underline" href="/">
				Home
			</Link>
		</div>
	);
};

export default FriendsPage;
