import type { TimelineItem as ITimelineItem } from "../../common/types";
import { useState } from "react";

interface TimelineItemProps {
	item: ITimelineItem;
	timelineStart: Date;
	daysPerPixel: number;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, timelineStart, daysPerPixel }) => {
	const [isHovered, setIsHovered] = useState(false);

	const startDate = new Date(item.start);
	const endDate = new Date(item.end);

	const startDiffInDays = (startDate.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24);
	const durationInDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

	const left = startDiffInDays / daysPerPixel;
	const width = durationInDays / daysPerPixel;

	return (
		<div
			className="absolute top-1 left-0 h-8 rounded-md bg-blue-500 text-white flex items-center px-2 text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:z-50 hover:overflow-visible hover:shadow-lg hover:bg-blue-600"
			style={{ left: `${left}px`, width: isHovered ? 'fit-content' : `${width}px` }}
			title={`${item.name} (${item.start} - ${item.end})`}
			onMouseEnter={() => { setIsHovered(true); }}
			onMouseLeave={() => { setIsHovered(false); }}
		>
			<span>{item.name}</span>
		</div>
	);
};