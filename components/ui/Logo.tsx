import Image from "next/image";
interface LogoProps {
	className?: string;
}

export const Logo: React.FC<LogoProps> = () => {
	return (
		<Image
			src="/images/hop-box-wordmark.png"
			alt="Logo"
			width={150}
			height={100}
			priority
			// className="mx-auto rounded-full mb-5 object-contain"
		/>
	);
};
