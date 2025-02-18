import "./Register.css";
import { useState } from "react";

interface SignupFormProps {
  closeForm: () => void;
}

const SignupForm = ({ closeForm }: SignupFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accounts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Inscription réussie !");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <section className="close-button-container grid-close-button-container">
        <button type="button" className="close-form-button" onClick={closeForm}>
          ×
        </button>
      </section>
      <h3 className="form-title">S'inscrire</h3>
      {/* Message d'erreur ou de réussite de l'inscription */}
      {message && <p className="form-message">{message}</p>}
      <label
        htmlFor="username-signup"
        className="form-label grid-label-username"
      >
        Pseudo
      </label>
      <input
        type="text"
        id="username-signup"
        className="form-input grid-input-username"
        placeholder="Entrez votre pseudo"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label htmlFor="email-signup" className="form-label grid-label-email">
        Email
      </label>
      <input
        type="email"
        id="email-signup"
        className="form-input grid-input-email"
        placeholder="Entrez votre adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label
        htmlFor="password-signup"
        className="form-label grid-label-password"
      >
        Mot de passe
      </label>
      <input
        type="password"
        id="password-signup"
        className="form-input grid-input-password"
        placeholder="Entrez votre mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="button-type2 form-button grid-form-button"
      >
        S'inscrire
      </button>
    </form>
  );
};

export default SignupForm;
