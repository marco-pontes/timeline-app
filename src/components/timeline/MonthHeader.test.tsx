import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import { MonthHeader } from './MonthHeader';
import '@testing-library/jest-dom';

describe('MonthHeader', () => {
	it('should render month headers and lines correctly', () => {
		const mockMonthPositions = [
			{ name: 'JAN', left: 0 },
			{ name: 'FEB', left: 100 },
			{ name: 'MAR', left: 200 },
		];
		const mockContainerWidth = 800;

		render(<MonthHeader containerWidth={mockContainerWidth} monthPositions={mockMonthPositions} />);

		// Assert that each month name is rendered
		expect(screen.getByText('JAN')).not.toBeNull();
		expect(screen.getByText('FEB')).not.toBeNull();
		expect(screen.getByText('MAR')).not.toBeNull();

		// Assert that the correct number of month headers are rendered
		const monthHeaders = screen.getAllByText(/^(JAN|FEB|MAR)$/);
		expect(monthHeaders.length).toBe(3);

		// Assert a specific month header's style
		expect(screen.getByText('FEB')).toHaveStyle('left: 100px');
	});

	it('should not render any headers if monthPositions is empty', () => {
		const mockMonthPositions: Array<{ name: string; left: number }> = [];
		const mockContainerWidth = 800;

		const { container } = render(<MonthHeader containerWidth={mockContainerWidth} monthPositions={mockMonthPositions} />);

		// Assert that no month headers are present in the document
		expect(container.querySelector('.text-center')).toBeNull();
	});
});