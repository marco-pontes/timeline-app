import type { FunctionComponent } from "../../common/types";

interface PageTitleProps {
	title: string;
}

export const PageTitle = ({ title }: PageTitleProps): FunctionComponent => {

	return (
			<p className="text-white text-6xl">{title}</p>
	);
};
