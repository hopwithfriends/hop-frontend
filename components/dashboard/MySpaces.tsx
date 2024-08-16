import { useState, useEffect } from "react";
import { ServiceMethods } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";
import { Button } from "@components/ui/Button";
import Image from "next/image";
import { IoLink } from "react-icons/io5";
import CreateSpaceButton from "./CreateSpaceButton";

interface Space {
	flyUrl: string;
	id: string;
	name: string;
	theme: string;
}

const UserSpaces = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [spaces, setSpaces] = useState<Space[]>([]);
	const user = useUser({ or: "redirect" });

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
			const response = await serviceMethods.fetchUserSpaces();

			console.log("Fetched user spaces:", response);

			if (Array.isArray(response) && response.length > 0) {
				setSpaces(response);
			} else {
				setSpaces([]);
			}
		} catch (err) {
			console.error("Error fetching user spaces:", err);
			setError(
				err instanceof Error
					? err.message
					: "An unexpected error occurred while fetching user spaces.",
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
	// const spaceUrl2 = space.id ? `http://localhost:3000/space/${space.id}` : null;

	return (
		<div className="">
			{error && <p className="text-red-500 mt-2 mb-4">{error}</p>}
			<div className="flex gap-4 justify-between">
				<CreateSpaceButton />
				{spaces.map((space) => (
					<div key={space.id} className="flex flex-col w-full">
						<div className="relative w-full h-56 rounded-2xl border-4 border-gray-800 overflow-hidden">
							<Image
								src="/placeholder.jpg"
								alt={space.name}
								fill={true}
								sizes="100%"
								priority
								className="object-cover"
							/>
						</div>
						<div className="flex items-center justify-between text-sm sm:text-base mt-2">
							<div className="flex items-center">
								<p className="font-bold truncate max-w-[150px]">{space.name}</p>
								<IoLink
									className="w-5 h-5 ml-2 text-gray-500 cursor-pointer"
									onClick={() => openVNC(space.id)}
								/>
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

export default UserSpaces;
