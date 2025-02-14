import { useContext, useState } from "react";
import "./EditInformations.css";
import { UserContext } from "../../services/UserContext";

type EditInformationsProps = {
  updateUserInformation: (
    username: string,
    email: string,
    password: string,
  ) => void;
};

function EditInformations({ updateUserInformation }: EditInformationsProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userContext = useContext(UserContext);

  if (!userContext || !userContext.user) {
    return <p>Chargement...</p>;
  }
  const userId = userContext.user.id;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !email || !password) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    setIsLoading(true);
    setMessage("");

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

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour.");
      }

      updateUserInformation(username, email, password);
      setMessage("Vos informations ont été mises à jour !");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-edit-informations">
        <label htmlFor="username" className="label-edit-informations">
          Pseudo :
          <input
            type="text"
            className="input-pseudo"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />

        <label htmlFor="password">
          Mot de passe :
          <input
            type="password"
            className="input-password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />

        <label htmlFor="email">
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

        <button
          type="submit"
          disabled={isLoading}
          className="button-type1 button-edit-informations"
        >
          {isLoading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </form>

      {message && <p className="message-success-info">{message}</p>}
    </>
  );
}

export default EditInformations;
