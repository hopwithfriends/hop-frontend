import { useState } from "react";
import { Copy } from "lucide-react";
import useCreateSpace from "@components/hooks/spaceHooks/useCreateSpace";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";
import { generateUUID, generatePassword } from "./UUID&PasswordGenerator";
import FriendSearch from "./FriendSearch";
import dotenv from "dotenv"; 
dotenv.config();

interface Friend {
	id: string;
	nickname: string;
	username: string;
}

const CreateSpaceForm: React.FC = () => {
	const user = useUser({ or: "redirect" });
	const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
	const [spaceName, setSpaceName] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);
	const [spaceId, setSpaceId] = useState<string | null>(null);
	const [spacePassword, setSpacePassword] = useState<string | null>(null);
	const [isSpaceCreated, setIsSpaceCreated] = useState(false);

	const {
		createSpace,
		loading: creating,
		error: createError,
		success,
	} = useCreateSpace();

	const handleSelectFriend = (friend: Friend) => {
		if (!selectedFriends.some((f) => f.id === friend.id)) {
			setSelectedFriends([...selectedFriends, friend]);
		}
	};

	const handleRemoveFriend = (friend: Friend) => {
		setSelectedFriends(selectedFriends.filter((f) => f.id !== friend.id));
	};

	const handleCreateSpace = async () => {
		if (!spaceName.trim()) {
			alert("Please enter a space name");
			return;
		}

		const newSpaceId = generateUUID();
		const newSpacePassword = generatePassword();

		setIsSpaceCreated(true);
		setSpaceId(newSpaceId);
		setSpacePassword(newSpacePassword);

		try {
			await createSpace({
				id: newSpaceId,
				password: newSpacePassword,
				userId: user.id,
				name: spaceName,
				theme: "default",
				flyUrl: "",
			});

			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) {
				throw new Error(
					"Access/refresh token are required for the ServiceMethods",
				);
			}

			const serviceMethods = new ServiceMethods(accessToken, refreshToken);

			for (const friend of selectedFriends) {
				await serviceMethods.fetchAddFriendToSpace(
					newSpaceId,
					friend.id,
					"member",
				);
			}

			console.log("Space created and friends added successfully");
		} catch (error) {
			console.error("Failed to create space or add friends:", error);
			alert("An error occurred while creating the space or adding friends.");
		}
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(
			() => {
				alert("Copied to clipboard!");
			},
			(err) => {
				console.error("Could not copy text: ", err);
			},
		);
	};

	const spaceUrl = spaceId ? `${process.env.FRONTEND_URL || "http://localhost:3000"}/space/${spaceId}` : null;

	return (
		<div className="w-full max-w-md mx-auto p-4 bg-gray-800 rounded-lg">
			<input
				type="text"
				placeholder="Space name"
				value={spaceName}
				onChange={(e) => setSpaceName(e.target.value)}
				className="w-full h-10 px-3 py-1 mb-6 bg-gray-700 text-white placeholder-gray-400 focus:outline-none rounded-xl text-sm"
			/>

			<FriendSearch
				onSelectFriend={handleSelectFriend}
				selectedFriends={selectedFriends}
				onRemoveFriend={handleRemoveFriend}
			/>

			<div className="flex items-center justify-between mb-4">
				<span className="text-white">Privacy setting</span>
				<label className="flex items-center cursor-pointer">
					<div className="relative">
						<input
							type="checkbox"
							className="sr-only"
							checked={isPrivate}
							onChange={() => setIsPrivate(!isPrivate)}
						/>
						<div
							className={`block w-14 h-8 rounded-full ${
								isPrivate ? "bg-blue-500" : "bg-gray-600"
							}`}
						/>
						<div
							className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
								isPrivate ? "transform translate-x-6" : ""
							}`}
						/>
					</div>
				</label>
			</div>

			<button
				type="button"
				onClick={handleCreateSpace}
				className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition-colors duration-200"
			>
				Create Space
			</button>

			{isSpaceCreated && spaceId && spacePassword && (
				<div className="mt-4 p-4 bg-gray-700 rounded-xl">
					<h3 className="text-white font-bold mb-2">
						Space Details (Creation in progress)
					</h3>
					<div className="flex items-center justify-between mb-2">
						<span className="text-white">Space ID:</span>
						<div className="flex items-center">
							<span className="text-blue-300 mr-2">{spaceId}</span>
							<button
								type="button"
								onClick={() => copyToClipboard(spaceUrl ?? "")}
								className="text-gray-400 hover:text-white"
							>
								<Copy size={16} />
							</button>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-white">Password:</span>
						<div className="flex items-center">
							<span className="text-blue-300 mr-2">{spacePassword}</span>
							<button
								type="button"
								onClick={() => copyToClipboard(spacePassword)}
								className="text-gray-400 hover:text-white"
							>
								<Copy size={16} />
							</button>
						</div>
					</div>
				</div>
			)}

			{createError && (
				<div className="mt-2 text-red-500">Error: {createError}</div>
			)}
		</div>
	);
};

export default CreateSpaceForm;
