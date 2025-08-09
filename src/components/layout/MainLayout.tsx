import type { ReactNode } from "react";
import type { FunctionComponent } from "../../common/types";

interface MainLayoutProps {
	children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps): FunctionComponent => {
	return (
		<div className="bg-blue-300 font-bold w-screen h-screen flex flex-col justify-center items-center">
			{children}
		</div>
	);
};