import type { FunctionComponent } from "../common/types";
import { PageTitle } from "../components/ui/PageTitle.tsx";
import { MainLayout } from "../components/layout/MainLayout.tsx";
import { t } from "i18next";

export const About = (): FunctionComponent => {
	return (
		<MainLayout>
			<PageTitle title={t("about.greeting")} />
			<p>This is the about page.</p>
		</MainLayout>
	);
};