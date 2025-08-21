import { createSlice } from '@reduxjs/toolkit';
import type {  PayloadAction } from '@reduxjs/toolkit';

import type { 
  UIState, 
  SetLoadingPayload, 
  SetSelectedPokemonPayload,
} from '../types';
import { createInitialUIState, toggleTheme as toggleThemeUtil } from '../utils';

// ui slice configuration
const initialState: UIState = createInitialUIState();

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    
    // loading action
    setLoading: (state, action: PayloadAction<SetLoadingPayload>) => {
      state.isLoading = action.payload.isLoading;
    },

    // modal action
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },

    setSelectedPokemonId: (state, action: PayloadAction<SetSelectedPokemonPayload>) => {
      state.selectedPokemonId = action.payload.pokemonId;
    },

    // theme action
    toggleTheme: (state) => {
      state.theme = toggleThemeUtil(state.theme);
    },


    // reset actions
    resetUI: () => initialState,
  },
});


export const {
  setLoading,
  toggleModal,
  setSelectedPokemonId,
  toggleTheme,
  resetUI,
} = uiSlice.actions;

// export reducer
export default uiSlice.reducer;
