"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
	motion,
	useTransform,
	AnimatePresence,
	useMotionValue,
	useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
	items,
}: {
	items: {
		id: number;
		name: string;
		designation: string;
		image: string;
	}[];
}) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const springConfig = { stiffness: 100, damping: 20 };
	const x = useMotionValue(0); 

	const rotate = useSpring(
		useTransform(x, [-100, 100], [-20, 20]),
		springConfig,
	);

    const translateX = useSpring(
		useTransform(x, [-100, 100], [-30, 30]),
		springConfig,
	);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleMouseMove = (event: any) => {
		const halfWidth = event.target.offsetWidth / 2;
		x.set(event.nativeEvent.offsetX - halfWidth); 
	};

	return (
		<>
			{items.map((item, idx) => (
				<div
					className="-mr-4 relative group"
					key={item.name}
					onMouseEnter={() => setHoveredIndex(item.id)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<AnimatePresence mode="popLayout">
						{hoveredIndex === item.id && (
							<motion.div
								initial={{ opacity: 0, y: 20, scale: 0.6 }}
								animate={{
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										type: "spring",
										stiffness: 260,
										damping: 10,
									},
								}}
								exit={{ opacity: 0, y: 20, scale: 0.6 }}
								style={{
									translateX: translateX,
									rotate: rotate,
									whiteSpace: "nowrap",
								}}
								className="absolute -top-[65px] -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black opacity-10 z-50 shadow-xl px-4 py-2"
							>
								<div className="font-bold text-hop-purple-200 relative z-30 text-base">
									{item.designation}
								</div>
								<div className="text-hop-purple-200 text-sm">{item.name}</div>
							</motion.div>
						)}
					</AnimatePresence>
					<Image
						onMouseMove={handleMouseMove}
						height={100}
						width={100}
						src={item.image}
						alt={item.name}
						className="object-cover mr-7 object-top rounded-full h-12 w-12 group-hover:scale-105 group-hover:z-30 relative transition duration-500 ring-4 ring-purple-600"
					/>
				</div>
			))}
		</>
	);
};
