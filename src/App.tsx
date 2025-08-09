import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import type { FunctionComponent } from "./common/types";
import type { TanstackRouter } from "./main";
import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";
import { ApplicationProvider } from "./context/ApplicationContext";

const queryClient = new QueryClient();

type AppProps = { router: TanstackRouter };

const App = ({ router }: AppProps): FunctionComponent => {
	return (
		<QueryClientProvider client={queryClient}>
			<ApplicationProvider>
				<RouterProvider router={router} />
				<TanStackRouterDevelopmentTools
					initialIsOpen={false}
					position="bottom-left"
					router={router}
				/>
				<ReactQueryDevtools initialIsOpen={false} position="bottom" />
			</ApplicationProvider>
		</QueryClientProvider>
	);
};

export default App;
