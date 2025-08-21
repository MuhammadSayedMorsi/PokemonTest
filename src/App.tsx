import { useAppDispatch, useAppSelector } from "./store";
import { toggleTheme } from "./store";
import PokemonList from "./components/PokemonList";
import PokemonModal from "./components/PokemonModal";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  return (
    <div
      className={`App ${theme} min-h-screen transition-all duration-300 ease-in-out`}
      data-testid="app"
    >
      <header className="flex justify-between items-center p-4">
        <h1 className="text-3xl text-shadow-amber-50 font-medium">
          POKEMON APP TASK
        </h1>
        <Button
          className="cursor-pointer"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              style={{ transform: "rotate(40deg)", cursor: "pointer" }}
            >
              <mask id="mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <circle cx="12" cy="4" r="9" fill="black" />
              </mask>
              <circle fill="black" cx="12" cy="12" r="9" mask="url(#mask)" />
            </svg>
          )}
        </Button>
      </header>

      <main className="w-full h-full">
        <PokemonList />
      </main>

      <PokemonModal />
    </div>
  );
}

export default App;
