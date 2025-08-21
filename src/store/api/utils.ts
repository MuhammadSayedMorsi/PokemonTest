import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { 
  ApiError 
} from './types';

// get the pokemon id so i can get pages and open the modal with the pokemon details
export const extractPokemonId = (url: string): number => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? parseInt(match[1], 10) : 0;
};


// the error handling
export const handleApiError = (error: FetchBaseQueryError): ApiError => {
  if ('status' in error) {
    const status = typeof error.status === 'number' ? error.status : 0;
    return {
      status,
      data: typeof error.data === 'string' ? error.data : 'Unknown error',
      message: `HTTP ${status}: ${typeof error.data === 'string' ? error.data : 'Unknown error'}`,
    };
  }
  return {
    status: 0,
    data: 'Network error',
    message: 'Network error occurred',
  };
};
