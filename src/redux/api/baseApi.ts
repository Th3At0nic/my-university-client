import { RootState } from "./../store";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", token);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs, // 'args' type (URL string or an object with method, headers, body, etc.)
  unknown, // Return type (usually inferred)
  FetchBaseQueryError // Error type
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Request a new token
    const refreshResult = await fetch(
      "http://localhost:5000/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    ).then((response) => response.json());

    const user = (api.getState() as RootState).auth.user;

    api.dispatch(
      setUser({
        user,
        token: refreshResult.data.accessToken,
      })
    );
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
