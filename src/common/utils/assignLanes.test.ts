import { describe, it, expect } from 'vitest';
import { assignLanes } from './assignLanes';
import type { TimelineItem } from '../types';

describe('assignLanes', () => {
	it('should assign non-overlapping items to a single lane', () => {
		// Scenario: Three sequential, non-overlapping items
		const items: Array<TimelineItem> = [
			{ id: 1, start: '2023-01-01', end: '2023-01-05', name: 'Item 1' },
			{ id: 2, start: '2023-01-06', end: '2023-01-10', name: 'Item 2' },
			{ id: 3, start: '2023-01-11', end: '2023-01-15', name: 'Item 3' },
		];

		const lanes = assignLanes(items);

		// Expected result is a single lane with all items
		expect(lanes.length).toBe(1);
		expect(lanes[0]).toEqual(items);
	});

	it('should assign overlapping items to different lanes', () => {
		// Scenario: Two items that overlap in time
		const items: Array<TimelineItem> = [
			{ id: 1, start: '2023-01-01', end: '2023-01-10', name: 'Item A' },
			{ id: 2, start: '2023-01-05', end: '2023-01-15', name: 'Item B' },
		];

		const lanes = assignLanes(items);

		// Expected result is two lanes, each with one item
		expect(lanes.length).toBe(2);
		expect(lanes[0]).toEqual([items[0]]);
		expect(lanes[1]).toEqual([items[1]]);
	});

	it('should handle a complex combination of overlapping items', () => {
		// Scenario: Multiple items with different overlapping patterns
		const items: Array<TimelineItem> = [
			{ id: 1, start: '2023-01-01', end: '2023-01-05', name: 'A' },
			{ id: 2, start: '2023-01-02', end: '2023-01-06', name: 'B' },
			{ id: 3, start: '2023-01-06', end: '2023-01-10', name: 'C' },
			{ id: 4, start: '2023-01-07', end: '2023-01-11', name: 'D' },
		];

		const lanes = assignLanes(items);

		// Expected result is two lanes:
		// Lane 1: Item A and C (do not overlap)
		// Lane 2: Item B and D (do not overlap with each other, but overlap with A and C)
		expect(lanes.length).toBe(2);
		expect(lanes[0]).toEqual([items[0], items[2]]);
		expect(lanes[1]).toEqual([items[1], items[3]]);
	});

	it('should return an empty array for empty input', () => {
		const items: Array<TimelineItem> = [];

		const lanes = assignLanes(items);

		// Expected result is an empty array of lanes
		expect(lanes.length).toBe(0);
		expect(lanes).toEqual([]);
	});

	it('should handle a single item, assigning it to a single lane', () => {
		const items: Array<TimelineItem> = [
			{ id: 1, start: '2023-01-01', end: '2023-01-05', name: 'Item 1' },
		];

		const lanes = assignLanes(items);

		// Expected result is a single lane with the item
		expect(lanes.length).toBe(1);
		expect(lanes[0]).toEqual([items[0]]);
	});
});