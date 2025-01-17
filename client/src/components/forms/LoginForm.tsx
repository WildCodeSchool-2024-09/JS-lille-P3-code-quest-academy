import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useContext, useRef } from "react";
import type { FormEventHandler } from "react";
import { UserContext } from "../../services/UserContext";

function LoginForm() {
  const usercontext = useContext(UserContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const setUser = usercontext?.setUser;

  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: (emailRef.current as HTMLInputElement).value,
            password: (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );
      if (response.status === 200) {
        const user = await response.json();
        setUser?.(user);
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="close-button-container">
        <button type="button" className="close-form-button">
          +
        </button>
      </div>
      <h3 className="form-title">Connexion</h3>
      <label htmlFor="email-login" className="form-label">
        Email
      </label>
      <input
        type="email"
        ref={emailRef}
        className="form-input"
        placeholder="Enter your email"
      />
      <label htmlFor="password-login" className="form-label">
        Password
      </label>
      <input
        type="password"
        ref={passwordRef}
        className="form-input"
        placeholder="Enter your password"
      />
      <button type="submit" className="form-button">
        Se connecter
      </button>
    </form>
  );
}

export default LoginForm;
