import type { 
  PokemonListParams, 
  PokemonIdentifier, 
} from './types';

export const pokemonEndpoints = {
 
  // pokemon list
  getPokemonList: {
    query: ({ limit = 30, offset = 0 }: PokemonListParams) => ({
      url: `pokemon?limit=${limit}&offset=${offset}`,
      method: 'GET',
    }),
    
  },

  // pokemon by id
  getPokemonById: {
    query: (id: PokemonIdentifier) => ({
      url: `pokemon/${id}`,
      method: 'GET',
    }),
  },

  // pokemon by name
  getPokemonByName: {
    query: (name: string) => ({
      url: `pokemon/${name.toLowerCase()}`,
      method: 'GET',
    }),
  },
};
