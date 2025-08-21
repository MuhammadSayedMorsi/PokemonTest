export interface Pokemon {
  readonly id: number;
  readonly name: string;
  readonly height: number;
  readonly weight: number;
  readonly base_experience: number;
  readonly types: readonly Type[];
  readonly sprites: Sprites;
  
}
export interface Type {
  readonly slot: number;
  readonly type: {
    readonly name: string;
    readonly url: string;
  };
}
export interface Sprites {
  readonly front_default: string | null;
  readonly front_shiny: string | null;
  readonly back_default: string | null;
  readonly back_shiny: string | null;
  readonly other: {
    readonly 'official-artwork': {
      readonly front_default: string | null;
      readonly front_shiny: string | null;
    };
  };
}

export interface PokemonListItem {
  readonly name: string;
  readonly url: string;
}

export interface PokemonListItemWithId extends PokemonListItem {
  readonly id: number;
}


export interface PokemonListParams {
  readonly limit?: number;
  readonly offset?: number;
}

export type PokemonIdentifier = string | number;

export interface ApiError {
  readonly status: number;
  readonly data: string;
  readonly message: string;
}
