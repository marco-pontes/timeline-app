import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import type { FunctionComponent } from "../common/types";
import { useApplicationContext } from "../context/ApplicationContext.tsx";
import { PageTitle } from "../components/ui/PageTitle.tsx";
import { MainLayout } from "../components/layout/MainLayout.tsx";

export const Home = (): FunctionComponent => {
	const { t, i18n } = useTranslation();
	const { test } = useApplicationContext()

	const onTranslateButtonClick = async (): Promise<void> => {
		if (i18n.resolvedLanguage === "en") {
			await i18n.changeLanguage("es");
		} else {
			await i18n.changeLanguage("en");
		}
	};

	return (
		<MainLayout>
			<PageTitle title={t("home.greeting")} />
			<button
				className="hover:cursor-pointer"
				type="submit"
				onClick={onTranslateButtonClick}
			>
				translate
			</button>
			<Link to="/about">About</Link>
			{test}
		</MainLayout>
	);
};
