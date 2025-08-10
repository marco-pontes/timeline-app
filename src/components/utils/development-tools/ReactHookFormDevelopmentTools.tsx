import React from "react";
import { isProduction } from "../../../common/utils/utils.ts";

export const ReactHookFormDevelopmentTools = isProduction
	? (): null => null
	: React.lazy(() =>
			import("@hookform/devtools").then((result) => ({
				default: result.DevTool,
			}))
	  );
