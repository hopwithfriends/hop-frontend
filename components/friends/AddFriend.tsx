import React, { useState } from "react";
import { ServiceMethods } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";

const AddFriendComponent = () => {
	const user = useUser({ or: "redirect" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [friendId, setFriendId] = useState("");

	const addFriend = async () => {
		if (!friendId.trim()) {
			setError("Please enter a friend ID");
			return;
		}

		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
			const serviceMethods = new ServiceMethods(
				accessToken || "",
				refreshToken || "",
			);
			const response = await serviceMethods.fetchAddFriend(friendId);

			const result = await response.json();

			if (response.ok) {
				setSuccess(true);
				setFriendId("");
			} else {
				throw new Error(result.message || "Failed to add friend");
			}
		} catch (err) {
			console.error("Error adding friend:", err);
			if (err instanceof SyntaxError) {
				setLoading(false);
			}
		}

		return (
			<div className="p-4 space-y-4">
				<h2 className="text-2xl font-bold">Add Friend</h2>
				<div className="flex space-x-2">
					<Input
						type="text"
						value={friendId}
						onChange={(e) => setFriendId(e.target.value)}
						placeholder="Enter friend ID"
						className="flex-grow"
					/>
					<Button onClick={addFriend} disabled={loading}>
						{loading ? "Adding..." : "Add Friend"}
					</Button>
				</div>

				{success && (
					<div
						className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
						role="alert"
					>
						<div className="font-medium">Success</div>
						<div>Friend added successfully!</div>
					</div>
				)}
			</div>
		);
	};
};

export default AddFriendComponent;
