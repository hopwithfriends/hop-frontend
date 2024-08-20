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
			<Button
				onClick={deleteFriend}
				className="bg-red-500 text-white px-4 py-2 rounded-lg"
				type="button"
				disabled={loading}
			>
				{loading ? "Removing..." : "Remove friend"}
			</Button>
			{success && (
				<p className="text-green-500 mt-2">Friend removed successfully!</p>
			)}
		</div>
	);
};

export default DeleteFriendComponent;
