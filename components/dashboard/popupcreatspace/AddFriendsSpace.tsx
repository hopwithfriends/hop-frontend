import { useEffect, useState } from "react";

const AddFriendsSpace = () => {
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const addUser = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/api/spaces/addUser",
				);
				if (!response.ok) {
					throw new Error("Failed to add user");
				}
			} catch (error) {
				setError(
					error instanceof Error ? error.message : "An unknown error occurred",
				);
			}
		};

		addUser();
	}, []);
};

export default AddFriendsSpace;
