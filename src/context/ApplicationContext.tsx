import { createContext, useContext, useState, type FunctionComponent, type ReactNode, useEffect } from "react"
import timelineItemsJson from "../timelineItems";
import type { TimelineItem } from "../common/types";

type ApplicationContextType = {
	timelineItems: Array<TimelineItem>;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

type ApplicationProviderProps = {
	children: ReactNode;
};


export const ApplicationProvider: FunctionComponent<ApplicationProviderProps> = ({ children }) => {
	const [timelineItems, setTimelineItems] = useState<Array<TimelineItem>>([]);

	useEffect(() => {
		setTimelineItems(timelineItemsJson)
	}, [])

	const contextValue = {
		timelineItems,
	};

	return <ApplicationContext.Provider value={contextValue}>{children}</ApplicationContext.Provider>;
};

export const useApplicationContext = (): ApplicationContextType => {
	const context = useContext(ApplicationContext);
	if (context === undefined) {
		throw new Error("useApplicationContext must be used within an ApplicationProvider");
	}
	return context;
};