import { useState, type ChangeEvent } from "react";
import { ServiceMethods } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";
import { Button } from "@components/ui/Button";

const DeleteSpaceButton = () => {
	const [spaceId, setSpaceId] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const user = useUser({ or: "redirect" });

	const handleDelete = async () => {
		if (!spaceId.trim()) {
			setError("Please enter a space ID");
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
			await serviceMethods.fetchRemoveSpace(spaceId);
			setSuccess(true);
			setSpaceId("");
		} catch (err) {
			console.error("Error deleting space:", err);
			setError("Failed to delete space. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSpaceId(e.target.value);
	};

	return (
		<div className="space-y-4">
			<input
				type="text"
				value={spaceId}
				onChange={handleInputChange}
				placeholder="Enter Space ID"
				className="w-full"
			/>
			<Button
				onClick={handleDelete}
				disabled={loading}
				className="w-full bg-red-500 hover:bg-red-600 text-white"
			>
				{loading ? "Deleting..." : "Delete Space"}
			</Button>
			{error && <p className="text-red-500 mt-2">{error}</p>}
			{success && (
				<p className="text-green-500 mt-2">Space deleted successfully!</p>
			)}
		</div>
	);
};

export default DeleteSpaceButton;
