import { Outlet } from "react-router-dom";
import "./App.css";
import AdminPage from "./components/adminpage/AdminPage";

function App() {

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
