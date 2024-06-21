import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Supply } from "./SuppliesList";

// Define a service using a base URL and expected endpoints
export const suppliesApi = createApi({
	reducerPath: "suppliesApi",
	baseQuery: fetchBaseQuery({
		baseUrl: new URL("/data.json", import.meta.url).href,
	}),
	endpoints: (builder) => ({
		getSupplies: builder.query<Supply[], undefined>({
			query: () => "",
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
