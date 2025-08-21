import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "../../store/api/apiSlice";
import uiReducer from "../../store/slices/uiSlice";
import PokemonModal from "../PokemonModal";

// Mock Pokemon data based on the PokeAPI response
const mockPokemon = {
  id: 5,
  name: "ekans",
  height: 8,
  weight: 90,
  base_experience: 45,
  abilities: [
    {
      ability: {
        name: "overgrow",
        url: "https://pokeapi.co/api/v2/ability/65/",
      },
      is_hidden: false,
      slot: 1,
    },
  ],
  types: [
    {
      slot: 1,
      type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
    },
  ],
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
    },
  ],
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",

    other: {
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      },
    },
  },
};

// Create a test store
const createTestStore = (
  initialUIState: Partial<ReturnType<typeof uiReducer>> = {}
) => {
  return configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
    preloadedState: {
      ui: {
        isModalOpen: true,
        selectedPokemonId: 1,
        theme: "light" as const,
        isLoading: false,
        currentPage: 1,
        itemsPerPage: 20,
        ...initialUIState,
      },
    },
  });
};

// Mock the API hooks
jest.mock("../../store/api/apiSlice", () => ({
  ...jest.requireActual("../../store/api/apiSlice"),
  useGetPokemonByIdQuery: jest.fn(),
}));

const mockUseGetPokemonByIdQuery =
  require("../../store/api/apiSlice").useGetPokemonByIdQuery;

describe("PokemonModal", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  const renderWithProvider = (component: React.ReactElement) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  it("nothing to be shown when modal is closed", () => {
    store = createTestStore({ isModalOpen: false, selectedPokemonId: null });

    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: undefined,
    });

    renderWithProvider(<PokemonModal />);

    expect(screen.queryByTestId("pokemon-modal")).not.toBeInTheDocument();
  });

  it("show loading when fetching is working!", () => {
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    renderWithProvider(<PokemonModal />);

    expect(screen.getByTestId("pokemon-loading")).toBeInTheDocument();
    expect(screen.getByText("Loading Pokemon details...")).toBeInTheDocument();
  });

  it("show errors in the middle of the screen when api fail", () => {
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 404, data: "Pokemon not found" },
    });

    renderWithProvider(<PokemonModal />);

    expect(screen.getByTestId("pokemon-error")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(
      screen.getByText("Failed to load Pokemon details.")
    ).toBeInTheDocument();
  });

  it("show pokemon details when data is loaded", () => {
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: undefined,
    });

    renderWithProvider(<PokemonModal />);

    expect(screen.getByTestId("pokemon-details")).toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("#1")).toBeInTheDocument();
  });

  it("when user click on the modal X button", async () => {
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: undefined,
    });

    renderWithProvider(<PokemonModal />);

    const closeButton = screen.getByTestId("modal-close");
    fireEvent.click(closeButton);

    await waitFor(() => {
      const state = store.getState();
      expect(state.ui.isModalOpen).toBe(false);
      expect(state.ui.selectedPokemonId).toBe(null);
    });
  });

  it("just allow outisde and X button clicking for the user to close the modal! No content clicking", () => {
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: undefined,
    });

    renderWithProvider(<PokemonModal />);

    const modalContent = screen
      .getByTestId("pokemon-details")
      .closest(".pokemon-modal");
    fireEvent.click(modalContent!);

    // Modal should still be open
    expect(screen.getByTestId("pokemon-modal")).toBeInTheDocument();
  });
});
