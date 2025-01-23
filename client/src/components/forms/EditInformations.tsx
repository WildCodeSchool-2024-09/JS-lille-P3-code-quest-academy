import { useState } from "react";
import "./EditInformations.css";

// Définition du type des props pour le composant
type EditInformationsProps = {
  updateUserInformation: (
    username: string,
    email: string,
    password: string,
  ) => void;
};

function EditInformations({ updateUserInformation }: EditInformationsProps) {
  const [username, setUsername] = useState(""); // État pour le pseudo
  const [email, setEmail] = useState(""); // État pour l'email
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [message, setMessage] = useState(""); // État pour afficher un message de feedback (succès ou erreur)
  const [isLoading, setIsLoading] = useState(false); // État pour gérer l'indicateur de chargement

  const userId = 1;

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation des champs : tous doivent être remplis
    if (!email || !password || !username) {
      setMessage("Veuillez remplir les trois champs.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accounts/${userId}/infos`,
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

        updateUserInformation(username, email, password);

        setUsername("");
        setEmail("");
        setPassword("");
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
      <form onSubmit={handleSubmit} className="form-edit-informations">
        {/* Champ pour le pseudo */}
        <label htmlFor="Pseudo" className="label-edit-informations">
          Pseudo :
          <input
            type="text"
            className="input-pseudo"
            id="pseudo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />

        {/* Champ pour le mot de passe */}
        <label htmlFor="Password">
          Password :
          <input
            type="password"
            className="input-password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />

        {/* Champ pour l'email */}
        <label htmlFor="Email">
          Email :
          <input
            type="email"
            className="input-email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={isLoading}
          className="button-edit-informations"
        >
          {isLoading ? "Mise à jour..." : "Mettre à jour"}{" "}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default EditInformations;
