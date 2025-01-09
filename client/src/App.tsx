import { Outlet } from "react-router-dom";
import "./App.css";
import { Provider } from "./services/Context";

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
