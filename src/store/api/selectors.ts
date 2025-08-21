import type { PokemonIdentifier, PokemonListParams } from './types';

export const createSelectPokemonById = (pokemonApi: any) => (id: PokemonIdentifier) =>
  pokemonApi.endpoints.getPokemonById.select(id);

export const createSelectPokemonList = (pokemonApi: any) => (params: PokemonListParams) =>
  pokemonApi.endpoints.getPokemonList.select(params);