import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest';
import { Timeline } from './Timeline';
import { TimelineItem } from './TimelineItem';
import type { TimelineItem as ITimelineItem } from "../../common/types";

// Mock the dependencies to isolate the Timeline component
const mockUseTimeline = vi.fn();

// This ensures that useTimeline is a mock function before it's used.
vi.mock('../../common/hooks/useTimeline', () => ({
	useTimeline: mockUseTimeline,
}));

vi.mock('./TimelineItem', () => ({
	TimelineItem: vi.fn(() => <div>TimelineItem Mock</div>),
}));
vi.mock('./MonthHeader', () => ({
	MonthHeader: vi.fn(() => <div>MonthHeader Mock</div>),
}));

describe('Timeline', () => {
	it('should display a message when there are no timeline items', () => {
		// Mock the useTimeline hook to return an empty state
		mockUseTimeline.mockReturnValue({
			timelineStart: null,
			daysPerPixel: 0,
			lanes: [],
			monthPositions: [],
		});

		const items: Array<ITimelineItem> = [];
		render(<Timeline items={items} />);

		// Assert that the empty message is rendered
		expect(screen.getByText('Nenhum item da linha do tempo para exibir.')).not.toBeNull();
	});

	it('should render the timeline components when items are provided', () => {
		const mockTimelineStart = new Date('2023-01-01');
		const mockItems: Array<ITimelineItem> = [
			{ id: 1, start: '2023-01-01', end: '2023-01-05', name: 'Evento 1' },
			{ id: 2, start: '2023-01-06', end: '2023-01-10', name: 'Evento 2' },
		];
		const mockLanes: Array<Array<ITimelineItem>> = [[mockItems[0]!], [mockItems[1]!]];
		const mockMonthPositions = [{ name: 'JAN', left: 0 }];

		// Mock the useTimeline hook to return valid data
		mockUseTimeline.mockReturnValue({
			daysPerPixel: 0.1,
			lanes: mockLanes,
			monthPositions: mockMonthPositions,
			timelineStart: mockTimelineStart,
		});

		render(<Timeline items={mockItems} />);

		// Assert that the "no items" message is not present
		expect(screen.queryByText('Nenhum item da linha do tempo para exibir.')).toBeNull();

		// Assert that TimelineItem is rendered for each item in the lanes
		expect(TimelineItem).toHaveBeenCalledTimes(mockItems.length);
	});
});