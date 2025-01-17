import { useState } from "react";
import "./EditInformations.css";

function EditInformations() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password || !username) {
      setMessage("Veuillez remplir les trois champs.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accounts`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Vos informations sont modifiées !!");
        setEmail("");
        setPassword("");
        setUsername("");
      } else {
        setMessage(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Pseudo">
          Pseudo :
          <input
            type="text"
            id="teacher_1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="Password">
          Password :
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="Email">
          Email :
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EditInformations;
