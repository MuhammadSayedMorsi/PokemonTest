import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from './api';
import uiReducer from './slices/uiSlice';

// ============================================================================
// STORE CONFIGURATION
// ============================================================================

/**
 * Configure the Redux store with all reducers and middleware
 */
export const store = configureStore({
  reducer: {
    // API reducers
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    
    // Feature reducers
    ui: uiReducer,
  },
  
  // Middleware configuration
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializable check for better performance
      serializableCheck: false,
      
      // Disable immutable check for better performance
      immutableCheck: false,
    }).concat(pokemonApi.middleware),
  
  // Development tools configuration
  devTools: process.env.NODE_ENV !== 'production',
});

// ============================================================================
// STORE SETUP
// ============================================================================

// Setup listeners for RTK Query
setupListeners(store.dispatch);

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
