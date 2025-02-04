import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useContext, useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { UserContext } from "../../services/UserContext";

// Claimed by TypeScript
interface LoginFormProps {
  closeForm: () => void;
}

function LoginForm({ closeForm }: LoginFormProps) {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext is null");
  }
  const { setUser } = userContext;
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setError(null);
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
        setUser(user);

        if (user.is_admin) {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="close-button-container">
        <button type="button" className="close-form-button" onClick={closeForm}>
          +
        </button>
      </div>
      <h3 className="form-title">Connexion</h3>

      {error && <p className="form-error">{error}</p>}

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
