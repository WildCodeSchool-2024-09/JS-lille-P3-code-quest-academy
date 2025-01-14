import "./App.css";
import LoginForm from "./components/forms/LoginForm";
import SignupForm from "./components/forms/SignupForm";
import { Provider } from "./services/Context";

function App() {
  return (
    <>
      <Provider>
        <LoginForm />
        <SignupForm />
      </Provider>
    </>
  );
}

export default App;
