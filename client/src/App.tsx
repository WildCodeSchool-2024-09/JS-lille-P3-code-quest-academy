import "./App.css";
import { Provider } from "./services/Context";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Provider>
        <Outlet />
      </Provider>
    </>
  );
}

export default App;
