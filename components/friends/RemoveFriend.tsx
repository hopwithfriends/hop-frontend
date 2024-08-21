import { useState } from "react";
import { ServiceMethods } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";
import { Button } from "@components/ui/Button";

interface DeleteFriendComponentProps {
	friendId: string;
	onFriendRemoved: (friendId: string) => void;
}

const DeleteFriendComponent: React.FC<DeleteFriendComponentProps> = ({
	friendId,
	onFriendRemoved,
}) => {
	const user = useUser({ or: "redirect" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const deleteFriend = async () => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
			const serviceMethods = new ServiceMethods(
				accessToken || "",
				refreshToken || "",
			);
			await serviceMethods.fetchRemoveFriend(friendId);
			setSuccess(true);
			onFriendRemoved(friendId);
		} catch (err) {
			console.error("Error deleting friend:", err);

			setLoading(false);
		}
	};

	return (
		<div>
			<button
				onClick={deleteFriend}
				className="focus:outline-none font-bold  text-white bg-[#7964D9] hover:bg-[#534399] rounded-md text-md px-5 py-2 mx-3 my-3 transition duration-300 ease-in-out"
				type="button"
				disabled={loading}
			>
				{loading ? "Removing..." : "Remove friend"}
			</button>
			{success && (
				<p className="text-green-500 mt-2">Friend removed successfully!</p>
			)}
		</div>
	);
};

export default DeleteFriendComponent;
