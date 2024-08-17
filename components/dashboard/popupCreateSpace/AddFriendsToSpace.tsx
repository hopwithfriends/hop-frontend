import { useState, type ChangeEvent } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";
import { Button } from "@components/ui/Button";

const AddUserToSpaceButton = () => {
	const [spaceId, setSpaceId] = useState("");
	const [friendId, setFriendId] = useState("");
	const [role, setRole] = useState<"anonymous" | "member" | "editor" | "owner">(
		"member",
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const user = useUser({ or: "redirect" });

	const handleAddUser = async () => {
		if (!spaceId.trim() || !friendId.trim()) {
			setError("Please enter both Space ID and Friend ID");
			return;
		}

		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) {
				throw new Error(
					"Access/refresh token are required for the ServiceMethods",
				);
			}

			const serviceMethods = new ServiceMethods(accessToken, refreshToken);
			await serviceMethods.fetchAddFriendToSpace(spaceId, friendId, role);

			setSuccess(true);
			setSpaceId("");
			setFriendId("");
			setRole("member");
			console.log("User added to space successfully");
		} catch (err) {
			console.error("Error adding user to space:", err);
			setError("Failed to add user to space. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange =
		(setter: React.Dispatch<React.SetStateAction<string>>) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			setter(e.target.value);
		};

	return (
		<div className="space-y-4">
			<input
				type="text"
				value={spaceId}
				onChange={handleInputChange(setSpaceId)}
				placeholder="Enter Space ID"
				className="w-full p-2 border rounded"
			/>
			<input
				type="text"
				value={friendId}
				onChange={handleInputChange(setFriendId)}
				placeholder="Enter Friend ID"
				className="w-full p-2 border rounded"
			/>
			<select
				value={role}
				onChange={(e) => setRole(e.target.value as "anonymous" | "member")}
				className="w-full p-2 border rounded"
			>
				<option value="member">Member</option>
				<option value="owner">Owner</option>
			</select>
			<Button
				onClick={handleAddUser}
				disabled={loading}
				className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
			>
				{loading ? "Adding..." : "Add User to Space"}
			</Button>
			{error && <p className="text-red-500 mt-2">{error}</p>}
			{success && (
				<p className="text-green-500 mt-2">User added to space successfully!</p>
			)}
		</div>
	);
};

export default AddUserToSpaceButton;
