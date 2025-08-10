import type React from 'react';

interface MonthHeaderProps {
	monthPositions: Array<{ name: string; left: number }>;
	containerWidth: number;
}

export const MonthHeader: React.FC<MonthHeaderProps> = ({ monthPositions, containerWidth }) => {
	return (
		<div className="flex w-full" style={{ minWidth: `${containerWidth + 100}px` }}>
			<div className="w-5/6 relative flex items-center justify-start border-b border-gray-300 h-16">
				{monthPositions.map((month, index) => (
					<div
						key={index}
						className="absolute text-center text-gray-600 font-semibold text-xs"
						style={{ left: `${month.left}px` }}
					>
						{month.name}
						<div className="w-px h-75 bg-gray-300 absolute left-1/2 -ml-px top-full mt-2"></div>
					</div>
				))}
			</div>
		</div>
	);
};