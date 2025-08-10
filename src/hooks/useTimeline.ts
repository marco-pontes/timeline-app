import { useEffect, useState } from "react";
import type { TimelineItem } from "../common/types";
import { assignLanes } from "../common/utils/assignLanes";


export interface UseTimelineResult {
	timelineStart: Date | null;
	daysPerPixel: number;
	lanes: Array<Array<TimelineItem>>;
	monthPositions: Array<{ name: string; left: number }>;
}

export function useTimeline(items: Array<TimelineItem>, containerWidth: number): UseTimelineResult {
	const [timelineStart, setTimelineStart] = useState<Date | null>(null);
	const [daysPerPixel, setDaysPerPixel] = useState(0);
	const [lanes, setLanes] = useState<Array<Array<TimelineItem>>>([]);
	const [monthPositions, setMonthPositions] = useState<Array<{ name: string; left: number }>>([]);

	const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

	useEffect(() => {
		if (items.length === 0) {
			setTimelineStart(null);
			setDaysPerPixel(0);
			setLanes([]);
			setMonthPositions([]);
			return;
		}

		const allDates = items.flatMap(item => [new Date(item.start), new Date(item.end)]);
		const start = new Date(Math.min(...allDates.map(d => d.getTime())));
		const end = new Date(Math.max(...allDates.map(d => d.getTime())));
		const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
		const dp = totalDays / containerWidth;

		setTimelineStart(start);
		setDaysPerPixel(dp);
		setLanes(assignLanes(items));

		const positions = [];
		const currentMonth = new Date(start.getFullYear(), start.getMonth(), 1);
		// eslint-disable-next-line no-unmodified-loop-condition
		while (currentMonth <= end) {
			const startOfMonth = new Date(currentMonth);
			const startDiffInDays = (startOfMonth.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
			const left = (startDiffInDays / dp);

			positions.push({
				name: monthNames[currentMonth.getMonth()] || '',
				left: left,
			});
			currentMonth.setMonth(currentMonth.getMonth() + 1);
		}
		setMonthPositions(positions);

	}, [items, containerWidth]);

	return { timelineStart, daysPerPixel, lanes, monthPositions };
}