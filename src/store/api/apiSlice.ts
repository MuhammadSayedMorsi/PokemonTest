import { createApi } from '@reduxjs/toolkit/query/react';
import { appBaseQuery } from './baseQuery';
import { pokemonEndpoints } from './endpoints';
import { createSelectPokemonById, createSelectPokemonList } from './selectors';

// api slice configuration
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: appBaseQuery,
  
  // Enhanced caching configuration
  keepUnusedDataFor: 300,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  
  tagTypes: ['Pokemon', 'PokemonList'] as const,

  endpoints: (builder) => ({
    getPokemonList: builder.query(pokemonEndpoints.getPokemonList),
    getPokemonById: builder.query(pokemonEndpoints.getPokemonById),
    getPokemonByName: builder.query(pokemonEndpoints.getPokemonByName),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonByIdQuery,
  useGetPokemonByNameQuery,
} = pokemonApi;

export const selectPokemonById = createSelectPokemonById(pokemonApi);
export const selectPokemonList = createSelectPokemonList(pokemonApi);

export * from './types';
