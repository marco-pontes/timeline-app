import type { TimelineItem } from "../types.ts";

/**
 * Takes an array of timeline items and assigns them to horizontal lanes to
 * minimize vertical space.
 * @param {TimelineItem[]} items An array of timeline items with start and end dates.
 * @returns {TimelineItem[][]} An array of arrays, where each inner array represents a lane.
 */
export function assignLanes(items: Array<TimelineItem>): Array<Array<TimelineItem>> {
	const sortedItems = [...items].sort((a, b) =>
		new Date(a.start).getTime() - new Date(b.start).getTime()
	);
	const lanes: Array<Array<TimelineItem>> = [];

	function assignItemToLane(item: TimelineItem): void {
		for (const lane of lanes) {
			const lastItem = lane[lane.length - 1];
			if (lastItem && new Date(lastItem.end).getTime() < new Date(item.start).getTime()) {
				lane.push(item);
				return;
			}
		}
		lanes.push([item]);
	}

	for (const item of sortedItems) {
		assignItemToLane(item);
	}
	return lanes;
}