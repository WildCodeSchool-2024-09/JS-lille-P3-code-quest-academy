import { useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

function EditUser({
  user,
  onUpdate,
}: {
  user: User;
  onUpdate: (updatedUser: User) => void;
}) {
  // user passer en tant que props
  // onUpdate utilisé pour actualiser les données une fois l'edit réussi

  const [formData, setFormData] = useState<User>({ ...user });
  // ...user permet de cloner les données de user avant de les modifier
  // car on ne peut pas modifier un objet passé en prop

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Conten-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const updateUser = await response.json();
        onUpdate(updateUser);
        alert("Utilisateur mis à jour avec succès !");
      } else {
        alert("Echec de la mise à jour de l'utilisateur.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la mise à jour.");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Modifier l'utilisateur</h2>
        <label>
          Nom de l'utilisateur :
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email de l'utilisateur :
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mot de passe de l'utilisateur :
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </>
  );
}

export default EditUser;
