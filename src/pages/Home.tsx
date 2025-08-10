import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../common/types";
import { useApplicationContext } from "../context/ApplicationContext.tsx";
import { PageTitle } from "../components/ui/PageTitle.tsx";
import { MainLayout } from "../components/layout/MainLayout.tsx";
import { Timeline } from "../components/timeline/Timeline.tsx";

export const Home = (): FunctionComponent => {
	const { t } = useTranslation();
	const { timelineItems } = useApplicationContext()

	return (
		<MainLayout>
			<PageTitle title={t("home.greeting")} />
			<Timeline items={timelineItems} />
		</MainLayout>
	);
};
