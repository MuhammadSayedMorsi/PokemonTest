import React, { useCallback, useState } from "react";
import { useGetPokemonListQuery } from "../store";
import { useAppDispatch, useAppSelector } from "../store";
import { setSelectedPokemonId, toggleModal } from "../store";

// I can call the image directly from the pokemon api becuase i need to the id to get the image, also i can call it direct below in html in <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{$pokemonId}.png" /> but i want to hadnle the error and have fallback image, so i create a seperate component.
const PokemonImage: React.FC<{ pokemonId: number; name: string }> = ({
  pokemonId,
  name,
}) => {
  const [hasError, setHasError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const primarySrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  const fallbackSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  const handleError = useCallback(() => {
    if (!useFallback) {
      setUseFallback(true);
    } else {
      setHasError(true);
    }
  }, [useFallback]);

  const currentSrc = useFallback ? fallbackSrc : primarySrc;

  return (
    <div className="">
      {hasError ? (
        <span>No Image</span>
      ) : (
        <img
          src={currentSrc}
          alt={name}
          loading="lazy"
          decoding="async"
          onError={handleError}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "contain",
          }}
        />
      )}
    </div>
  );
};

//  main pokemon list
const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);

  const { results, isLoading, error } = useGetPokemonListQuery(
    {},
    {
      selectFromResult: ({ data, isLoading, error }) => ({
        results: data?.results ?? [],
        isLoading,
        error,
      }),
    }
  );

  // so here if the user click on any pokemon Card the selected pokeon id is set and the modal is open to show some of the details. there is a lot of details there but i will take time to make it looks better so i go for the easy ones like height etc.
  const handlePokemonClick = useCallback(
    (pokemonId: number) => {
      dispatch(setSelectedPokemonId({ pokemonId }));
      dispatch(toggleModal());
    },
    [dispatch]
  );

  // this func is extract the id from the url
  const extractPokemonId = useCallback((url: string): number => {
    const match = url.match(/\/(\d+)\/$/);
    return match ? parseInt(match[1], 10) : 0;
  }, []);

  // here loader to show untill data is shown
  if (isLoading) {
    return (
      <div
        className={`pokemon-list ${theme} min-h-screen flex items-center justify-center`}
      >
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
          <span className="text-sm font-medium animate-pulse">
            Loading Pokémon...
          </span>
        </div>
      </div>
    );
  }

  // here a message will show if the api is not working.
  if (error) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center p-4 bg-amber-400 capitalize">
        <h2 className="text-red-500 text-3xl font-semibold">
          Error loading Pokemon
        </h2>
        <p className="text-red-500 text-lg font-semibold">
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className={`pokemon-list ${theme}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
        {results.map((pokemon) => {
          const pokemonId = pokemon.id ?? extractPokemonId(pokemon.url);
          return (
            <div
              key={pokemon.id ?? pokemon.name}
              className="p-[1.5rem] rounded-xl border shadow-md 
                flex flex-col items-center justify-center
                cursor-pointer
                hover:shadow-lg 
                hover:-translate-y-2 
                transform transition-all 
                duration-300 
                ease-in-out 
                hover:scale-105
                active:scale-95
                dark:bg-gray-800 
                dark:border-gray-700
                hover:border-primary/50
                group"
              onClick={() => handlePokemonClick(pokemonId)}
              data-testid={`pokemon-card-${pokemonId}`}
            >
              <PokemonImage pokemonId={pokemonId} name={pokemon.name} />
              <div className="flex flex-col items-center">
                <h3 className="text-base font-bold capitalize group-hover:text-primary transition-colors duration-300">
                  {pokemon.name}
                </h3>
                <p className="text-xs font-bold opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  ID({pokemonId})
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;
