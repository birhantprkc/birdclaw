import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, type ReactNode } from "react";
import { fetchQueryEnvelope } from "./api-client";
import { queryKeys } from "./query-client";

const DeploymentModeContext = createContext({ readOnly: false, ready: true });

export function DeploymentModeProvider({ children }: { children: ReactNode }) {
	const status = useQuery({
		queryKey: queryKeys.status,
		queryFn: ({ signal }) => fetchQueryEnvelope({ signal }),
	});
	return (
		<DeploymentModeContext.Provider
			value={{
				readOnly: status.data?.readOnly === true,
				ready: status.isSuccess,
			}}
		>
			{children}
		</DeploymentModeContext.Provider>
	);
}

export function useDeploymentMode() {
	return useContext(DeploymentModeContext);
}
