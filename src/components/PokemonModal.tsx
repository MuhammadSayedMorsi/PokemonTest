import React, { useCallback } from "react";
import { useGetPokemonByIdQuery } from "../store";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleModal, setSelectedPokemonId } from "../store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const PokemonModal: React.FC = () => {
  const dispatch = useAppDispatch();

  // get the mdoal state and selected pokemnon id the store
  const { isModalOpen, selectedPokemonId } = useAppSelector(
    (state) => state.ui
  );

  // close the modal when user click on x button & set pokemon id to null
  const handleClose = useCallback(() => {
    dispatch(toggleModal());
    dispatch(setSelectedPokemonId({ pokemonId: null }));
  }, [dispatch]);

  // fetch pokemon details with the provide id
  const {
    data: pokemon,
    isLoading,
    error,
  } = useGetPokemonByIdQuery(selectedPokemonId || 0, {
    skip: !selectedPokemonId,
  });

  // If the modal is not open or no Pokemon ID is selected there then return null
  if (!isModalOpen || !selectedPokemonId) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className={` max-w-3xl max-h-[90vh] overflow-y-auto`}>
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold">
            {pokemon?.name && (
              <span className="text-red-500 text-2xl capitalize">
                {pokemon.name}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <>
          {isLoading && (
            <div className="loading flex flex-col items-center gap-4">
              <svg
                className="animate-spin h-10 w-10 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-white text-sm font-medium animate-pulse">
                Loading Specific Pokemon
              </span>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-4 p-4">
              <h3 className="text-lg text-red-500 font-semibold">Error</h3>
              <p className="text-base text-red-300 font-medium">
                Failed to load Pokemon details.
              </p>
            </div>
          )}

          {pokemon && (
            <>
              <div className="m-auto w-[200px] h-[200px] rounded-full overflow-hidden mb-4">
                <img
                  src={
                    pokemon.sprites.front_default ||
                    pokemon.sprites.other["official-artwork"].front_default ||
                    ""
                  }
                  className="w-full h-full object-cover"
                  alt={pokemon.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = pokemon.sprites.front_default || "";
                  }}
                />
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:gap-4 p-4`}>
                <div className="border-1 solid rounded-sm p-1">
                  {pokemon.types.map((type) => (
                    <span key={type.slot} className="text-base font-medim">
                      Type: {type.type.name}
                    </span>
                  ))}
                </div>
                <div className="border-1 solid rounded-sm p-1">
                  <span className="text-base  font-medium">Height: </span>
                  <span className="stat-value">
                    {(pokemon.height / 10).toFixed(1)} m
                  </span>
                </div>

                <div className="border-1 solid rounded-sm p-1">
                  <span className="text-base  font-medium">Weight: </span>
                  <span className="stat-value">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </span>
                </div>

                <div className="border-1 solid rounded-sm p-1">
                  <span className="text-base font-medium mr-1">
                    Base Experience:
                  </span>
                  <span className="text-base font-medium">
                    {pokemon.base_experience}
                  </span>
                </div>
              </div>
            </>
          )}
        </>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonModal;
