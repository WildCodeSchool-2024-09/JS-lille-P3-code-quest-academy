import { useState } from "react";
import "./EditTeachers.css";

// Définition des props attendues pour le composant
type EditTeacherProps = {
  updateTeacherInformation: (teacher_1: string, teacher_2: string) => void;
};

function EditTeacher({ updateTeacherInformation }: EditTeacherProps) {
  // États pour les champs de formulaire
  const [teacher_1, setTeacher_1] = useState(""); // État pour le nom du premier enseignant
  const [teacher_2, setTeacher_2] = useState(""); // État pour le nom du second enseignant
  const [message, setMessage] = useState(""); // État pour afficher les messages d'erreur ou de succès
  const [isLoading, setIsLoading] = useState(false); // État pour indiquer le chargement

  const userId = 1; // Identifiant statique de l'utilisateur (à rendre dynamique si nécessaire)

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Vérifie que les deux champs sont remplis
    if (!teacher_1 || !teacher_2) {
      setMessage("Veuillez remplir les deux champs."); // Affiche un message d'erreur si un champ est vide
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Requête pour mettre à jour les enseignants via l'API
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accounts/${userId}/trainers`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacher_1, teacher_2 }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `${teacher_1} et ${teacher_2} sont désormais vos enseignants !`,
        );

        updateTeacherInformation(teacher_1, teacher_2);

        setTeacher_1(""); // Réinitialise le champ "teacher_1"
        setTeacher_2(""); // Réinitialise le champ "teacher_2"
      } else {
        setMessage(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Formulaire pour modifier les enseignants */}
      <form onSubmit={handleSubmit} className="form-edit-teacher">
        {/* Champ pour le premier enseignant */}
        <label htmlFor="teacher_1" className="first-label-teacher">
          Enseignant 1 :
          <input
            type="text"
            className="first-input-teacher"
            id="teacher_1"
            value={teacher_1}
            onChange={(e) => setTeacher_1(e.target.value)}
          />
        </label>
        <br />
        {/* Champ pour le second enseignant */}
        <label htmlFor="teacher_2" className="second-label-teacher">
          Enseignant 2 :
          <input
            type="text"
            className="second-input-teacher"
            id="second-input-teacher"
            value={teacher_2}
            onChange={(e) => setTeacher_2(e.target.value)}
          />
        </label>
        <br />
        {/* Bouton de soumission */}
        <button
          className="button-sumbmit-teacher"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Mise à jour..." : "Mettre à jour"}{" "}
        </button>
      </form>
      {/* Affichage des messages d'erreur ou de succès */}
      {message && <p className="message-teacher">{message}</p>}
    </div>
  );
}

export default EditTeacher;
