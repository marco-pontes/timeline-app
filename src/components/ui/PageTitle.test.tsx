import { render, screen } from "@testing-library/react";
import { PageTitle } from "./PageTitle";


describe("PageTitle", () => {

	test("should render the title passed as a prop", () => {

		const testTitle = "Hello, World!";

		render(<PageTitle title={testTitle} />);

		const titleElement: HTMLElement = screen.getByText(testTitle);

		expect(titleElement).not.toBeNull();
	});
});