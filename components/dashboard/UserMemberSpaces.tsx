import { useState, useEffect } from "react";
import { ServiceMethods } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import RemoveSpaceButton from "@components/space/RemoveSpace";
import { FaLink } from "react-icons/fa";
import InviteContainer from "./InviteContainer";

interface Space {
	flyUrl: string;
	id: string;
	name: string;
	theme: string;
	password: string;
}

const UserMemberSpaces = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [spaces, setSpaces] = useState<Space[]>([]);
	const user = useUser({ or: "redirect" });
	const [copiedSpaceId, setCopiedSpaceId] = useState<string | null>(null);

	const fetchSpaces = async () => {
		setLoading(true);
		setError(null);

		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) {
				throw new Error(
					"Access/refresh token are required for the ServiceMethods",
				);
			}

			const serviceMethods = new ServiceMethods(accessToken, refreshToken);
			const response = await serviceMethods.fetchInvitedSpace();

			console.log("Fetched Invited spaces:", response);

			if (Array.isArray(response) && response.length > 0) {
				setSpaces(response);
			} else {
				setSpaces([]);
			}
		} catch (err) {
			console.error("Error fetching Invited spaces:", err);
			setError(
				err instanceof Error
					? err.message
					: "An unexpected error occurred while fetching Invited spaces.",
			);
		} finally {
			setLoading(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchSpaces();
	}, []);

	const openVNC = (spaceId: string) => {
		const spaceUrl = `http://localhost:3000/space/${spaceId}`;
		window.open(spaceUrl, "_blank");
	};

	const handleRemoveSpace = (removedSpaceId: string) => {
		setSpaces(spaces.filter((space) => space.id !== removedSpaceId));
	};

	const copyToClipboard = (space: Space) => {
		const spaceUrl = `http://localhost:3000/space/${space.id}`;
		setCopiedSpaceId(space.id);
		setTimeout(() => setCopiedSpaceId(null), 3000);
	};

	return (
		<div className="">
			{error && <p className="text-red-500 mt-2 mb-4">{error}</p>}
			<div className="flex gap-4 justify-between">
				<InviteContainer />
				{spaces.map((space) => (
					<div key={space.id} className="flex flex-col w-full">
						<div
							className="relative w-full h-56 rounded-2xl border-4 border-gray-800 overflow-hidden cursor-pointer"
							onClick={() => openVNC(space.id)}
							onKeyDown={() => {}}
							onKeyUp={() => {}}
						>
							<Image
								src="/placeholder.jpg"
								alt={space.name}
								fill={true}
								sizes="100%"
								priority
								className="object-cover"
							/>
							<div className="absolute bottom-2 right-2 border-0">
								<RemoveSpaceButton
									spaceId={space.id}
									onRemove={handleRemoveSpace}
								/>
							</div>
						</div>
						<div className="flex items-center justify-between text-sm sm:text-base mt-2">
							<div className="flex items-center">
								<p className="font-bold truncate max-w-[150px]">{space.name}</p>
								{copiedSpaceId === space.id ? (
									<span className="ml-2 text-green-500">Copied</span>
								) : (
									<FaLink
										className="w-5 h-5 ml-2 text-gray-500 cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											copyToClipboard(space);
										}}
										title="Copy space URL and password to clipboard"
									/>
								)}
							</div>
							<div className="flex items-center">
								<div className="w-6 h-6 bg-gray-300 rounded-[10px]" />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default UserMemberSpaces;
