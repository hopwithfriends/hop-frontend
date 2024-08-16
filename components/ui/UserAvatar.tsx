import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import classNames from "classnames";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
interface AvatarProps {
	icon?: string;
	username: string;
	nickname?: string;
	size?: "small" | "medium" | "large";
	color?: string;
}
interface UserState {
	username: string;
	color: string;
	cursor: string;
	x: number;
	y: number;
}
interface User {
	username: string;
	state: UserState;
}
interface Users {
	[uuid: string]: User;
}

const Avatar: React.FC<AvatarProps> = ({
	icon,
	username,
	nickname,
	size = "medium",
	color = "blue",
	
}) => {
	const sizeClasses = {
		small: "w-8 h-8 text-xs",
		medium: "w-12 h-12 text-sm",
		large: "w-16 h-16 text-base",
	};
	const sizeClass = sizeClasses[size] || sizeClasses.medium;

	return (
		<div className="relative inline-block ml-5 mt-5 group">
			<div
				className={classNames(
					sizeClass,
					"relative rounded-full overflow-hidden flex items-center justify-center border-3",
				)}
				style={{ borderColor: color }}
			>
				{icon ? (
					<Image
						src={icon}
						alt={username}
						fill={true}
						sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
						className="object-cover rounded-full"
					/>
				) : (
					<FaRegUserCircle className="w-[100%] h-[100%] text-white" />
				)}
			</div>
			<div className="absolute left-1/2 bottom-full transform -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-500 text-white p-2 rounded mb-1 text-xs whitespace-nowrap z-10">
				<p>Username: {username}</p>
				{nickname && <p>Nickname: {nickname}</p>}
			</div>
		</div>
	);
};

export default Avatar;
