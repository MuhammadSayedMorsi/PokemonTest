import { useDispatch, useSelector } from 'react-redux';
import type {  TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// get ui state
export const useUIState = () => useAppSelector((state) => state.ui);


// get the theme
export const useTheme = () => useAppSelector((state) => state.ui.theme);


// get the modal state
export const useModalState = () => useAppSelector((state) => ({
  isOpen: state.ui.isModalOpen,
  selectedId: state.ui.selectedPokemonId,
}));

// get loading state
export const useLoadingState = () => useAppSelector((state) => state.ui.isLoading);
