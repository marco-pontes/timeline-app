import type { TimelineItem as ITimelineItem } from "../../common/types";
import { TimelineItem } from "./TimelineItem";
import { useTimeline } from "../../hooks/useTimeline";
import { MonthHeader } from "./MonthHeader";
import type { UseTimelineResult } from "../../hooks/useTimeline.ts";

interface TimelineProps {
	items: Array<ITimelineItem>;
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
	const containerWidth = 800;
	const { timelineStart, daysPerPixel, lanes, monthPositions }: UseTimelineResult = useTimeline(items, containerWidth);


	if (items.length === 0 || timelineStart === null) {
		return (
			<div className="flex justify-center items-center h-48 text-gray-500">
				Nenhum item da linha do tempo para exibir.
			</div>
		);
	}

	return (
		<div className="p-4 bg-gray-100 rounded-lg shadow-inner w-full">
			<div className="overflow-x-auto">
				<MonthHeader containerWidth={containerWidth} monthPositions={monthPositions} />
				<div className="w-full relative" style={{ minWidth: `${containerWidth + 100}px` }}>
					{lanes.map((lane, laneIndex) => (
						<div key={laneIndex} className="relative h-10 mb-2">
							{lane.map(item => (
								<TimelineItem
									key={item.id}
									daysPerPixel={daysPerPixel}
									item={item}
									timelineStart={timelineStart}
								/>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};