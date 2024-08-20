import { useState, useEffect, useRef, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";
import LoadingSpinner from "@components/ui/Spiner";
import io from "socket.io-client";
import debounce from "lodash/debounce";
import dotenv from "dotenv"; 
dotenv.config();
interface VncDisplayProps {
	spaceId: string;
}

interface Cursor {
	x: number;
	y: number;
}

const CursorOverlay: React.FC = () => {
	const [cursors, setCursors] = useState<{ [key: string]: Cursor }>({});
	const overlayRef = useRef<HTMLDivElement>(null);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const socketRef = useRef<any>(null);

	const normalizeCoordinates = (x: number, y: number): [number, number] => {
		if (!overlayRef.current) return [0, 0];
		const rect = overlayRef.current.getBoundingClientRect();
		return [
			Math.max(0, Math.min(1, x / rect.width)),
			Math.max(0, Math.min(1, y / rect.height)),
		];
	};

	const handleMouseMove = useCallback(
		debounce((e: MouseEvent) => {
			if (overlayRef.current && socketRef.current) {
				const rect = overlayRef.current.getBoundingClientRect();
				const [x, y] = normalizeCoordinates(
					e.clientX - rect.left,
					e.clientY - rect.top,
				);
				socketRef.current.emit("cursorMove", { x, y });
			}
		}, 16), // Debounce to about 60fps
		[],
	);

	useEffect(() => {
		socketRef.current = io(
			process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000",
		);

		socketRef.current.on(
			"cursorUpdate",
			(data: { id: string; x: number; y: number }) => {
				setCursors((prev) => ({
					...prev,
					[data.id]: { x: data.x, y: data.y },
				}));
			},
		);

		socketRef.current.on("cursorRemove", (id: string) => {
			setCursors((prev) => {
				const newCursors = { ...prev };
				delete newCursors[id];
				return newCursors;
			});
		});

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [handleMouseMove]);

	return (
		<div ref={overlayRef} className="absolute inset-0 pointer-events-none">
			{Object.entries(cursors).map(([id, position]) => (
				<div
					key={id}
					className="absolute w-4 h-4 bg-red-500 rounded-full"
					style={{
						left: `${position.x * 100}%`,
						top: `${position.y * 100}%`,
						transform: "translate(-50%, -50%)",
					}}
				/>
			))}
		</div>
	);
};

const VncDisplay: React.FC<VncDisplayProps> = ({ spaceId }) => {
	const user = useUser({ or: "redirect" });
	const [flyUrl, setFlyUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchSpaceData = async () => {
			if (!isMounted || flyUrl) return;

			try {
				const { accessToken, refreshToken } = await user.getAuthJson();
				if (!accessToken || !refreshToken) {
					throw new Error(
						"Access/refresh token are required for the ServiceMethods",
					);
				}

				const serviceMethods = new ServiceMethods(accessToken, refreshToken);
				const response = await serviceMethods.fetchSpaceById(spaceId);

				if (isMounted && response.flyUrl) {
					setFlyUrl(response.flyUrl);
					setLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(
						err instanceof Error
							? err.message
							: "An unexpected error occurred while fetching space data.",
					);
				}
			}
		};

		fetchSpaceData();

		return () => {
			isMounted = false;
		};
	}, [user, spaceId, flyUrl]);

	if (loading) {
		return (
			<div className="flex justify-center items-center w-full h-full">
				<LoadingSpinner />
				<p className="ml-4 text-center">Waiting for VNC to be ready...</p>
			</div>
		);
	}

	if (error) {
		return <div className="text-center text-red-500">{error}</div>;
	}

	return (
		<div className="relative w-full h-screen">
			{flyUrl && (
				<>
					<iframe
						ref={iframeRef}
						className="absolute inset-0 w-full h-full border-0"
						title="vnc"
						src={flyUrl}
					/>
					<CursorOverlay />
				</>
			)}
		</div>
	);
};

export default VncDisplay;