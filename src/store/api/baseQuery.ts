import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {  BaseQueryFn } from '@reduxjs/toolkit/query';
import { handleApiError } from './utils';


// the basequery
export const appBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
    timeout: 10000,
  });

  const result = await baseQuery(args, api, extraOptions);

  // Handle errors
  if (result.error) {
    const ApiError = handleApiError(result.error);
    return { error: ApiError };
  }

  return result;
};
