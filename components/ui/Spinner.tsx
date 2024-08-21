import type React from 'react';
interface LoadingSpinnerProps {
	border: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({border}) => {
	return (
		<div className="flex justify-center items-center h-full">
			<div className={`animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 ${border}`} />
		</div>
	);
};

export default LoadingSpinner;
