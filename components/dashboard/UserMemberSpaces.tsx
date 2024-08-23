"use client";

import { useState, useEffect, useCallback } from "react";
import { ServiceMethods } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import RemoveSpaceButton from "@components/space/RemoveSpace";
import { FaLink } from "react-icons/fa";
import { useRemoveUserFromSpace } from "@components/hooks/spaceHooks/useRemoveUserFromSpace";
import { useFetchUserId } from "@components/hooks/useFetchUserId";
import dotenv from "dotenv";
import LinkIcon from "./LinkIcon";
dotenv.config();

interface Space {
	flyUrl: string;
	thumbnail: string;
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
	const { removeUserFromSpace } = useRemoveUserFromSpace();
	const { fetchUserId, userId } = useFetchUserId();

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
		fetchUserId();
	}, []);

	const openVNC = (spaceId: string) => {
		const spaceUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"}/space/${spaceId}`;
		window.open(spaceUrl, "_blank");
	};

	const handleRemoveSpace = useCallback(
		async (removedSpaceId: string) => {
			if (!userId) {
				console.error("User ID is not available");
				return;
			}

			const success = await removeUserFromSpace(removedSpaceId, userId);
			if (success) {
				setSpaces(spaces.filter((space) => space.id !== removedSpaceId));
			}
		},
		[userId, removeUserFromSpace, spaces],
	);

	const copyToClipboard = (space: Space) => {
		const spaceUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"}/space/${space.id}`;
		setCopiedSpaceId(space.id);
		setTimeout(() => setCopiedSpaceId(null), 3000);
	};

	return (
		<div className="">
			{error && <p className="text-red-500 mt-2 mb-4">{error}</p>}
			<div className="flex gap-4 justify-between max-w-full flex-wrap gap-y-10">
				{spaces.map((space) => (
					<div key={space.id} className="flex flex-col min-w-[23.5%]">
						<div
							className="relative w-full h-56 rounded-2xl border-4 border-gray-800 overflow-hidden cursor-pointer"
							onClick={() => openVNC(space.id)}
							onKeyDown={() => {}}
							onKeyUp={() => {}}
						>
							<Image
								src={space.thumbnail || "/placeholder.jpg"}
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
								<p className="font-bold truncate max-w-[150px] mr-2">
									{space.name}
								</p>
							</div>
							<div className="flex items-center gap-1">
								{copiedSpaceId === space.id ? (
									<span className="ml-2 text-green-500">Copied</span>
								) : (
									<LinkIcon
										onClick={(e: React.MouseEvent<SVGSVGElement>) => {
											e.stopPropagation();
											copyToClipboard(space);
										}}
									/>
								)}
								<div className="w-6 h-6 bg-gray-300 rounded-[20px]" />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default UserMemberSpaces;
