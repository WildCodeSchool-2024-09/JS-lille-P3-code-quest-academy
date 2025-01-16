import "./App.css";
import { Outlet } from "react-router-dom";
import { Provider as GameProvider } from "../src/services/GameContext";
import { Provider as UserProvider } from "../src/services/UserContext";

function App() {
  return (
    <GameProvider>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </GameProvider>
  );
}

export default App;
