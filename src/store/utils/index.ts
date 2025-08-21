import type {UIState, Theme} from '../types';
import { UI_CONSTANTS, THEMES, MODAL } from '../constants';



// create inittial state 
export const createInitialUIState = (): UIState => ({
  isLoading: UI_CONSTANTS.DEFAULT_LOADING,
  isModalOpen: MODAL.DEFAULT_OPEN,
  selectedPokemonId: null,
  theme: UI_CONSTANTS.DEFAULT_THEME,
})


// this utility function will switches between dark and light
export const toggleTheme = (currentTheme: Theme): Theme => currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
