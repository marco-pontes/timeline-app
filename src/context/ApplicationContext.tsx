import { createContext, useContext, useState, type FunctionComponent, type ReactNode } from "react"


type ApplicationContextType = {
	test: "light" | "dark";
	toggleTest: () => void;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

type ApplicationProviderProps = {
	children: ReactNode;
};


export const ApplicationProvider: FunctionComponent<ApplicationProviderProps> = ({ children }) => {
	const [test, setTest] = useState<"light" | "dark">("dark");

	const toggleTest = (): void => {
		setTest((previousTest) => (previousTest === "light" ? "dark" : "light"));
	};

	const contextValue = {
		test,
		toggleTest,
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