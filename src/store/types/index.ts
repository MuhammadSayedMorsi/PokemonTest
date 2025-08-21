// User Interface Types
export interface UIState {
  readonly isLoading: boolean;
  readonly isModalOpen: boolean;
  readonly selectedPokemonId: number | null;
  readonly theme: 'light' | 'dark';

}
export type Theme = 'light' | 'dark';


export interface ModalState {
  readonly isOpen: boolean;
  readonly selectedId: number | null;
}

export interface LoadingState {
  readonly isLoading: boolean;

}

export interface SetLoadingPayload {
  readonly isLoading: boolean;
}

export interface SetSelectedPokemonPayload {
  readonly pokemonId: number | null;
}

export interface SetPagePayload {
  readonly page: number;
}
