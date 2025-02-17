import { useContext, useState } from "react";
import { UserContext } from "../../services/UserContext";
import "./EditTeachers.css";

type EditTeacherProps = {
  updateTeacherInformation: (
    firstTeacher: string,
    secondTeacher: string,
  ) => void;
};

function EditTeacher({ updateTeacherInformation }: EditTeacherProps) {
  const [firstTeacher, setFirstTeacher] = useState("");
  const [secondTeacher, setSecondTeacher] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userContext = useContext(UserContext);

  if (!userContext || !userContext.user) {
    return <p>Chargement...</p>;
  }

  const userId = userContext.user.id;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!firstTeacher || !secondTeacher) {
      setMessage("Veuillez remplir les deux champs.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accounts/${userId}/trainers`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstTeacher, secondTeacher }),
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour.");
      }

      updateTeacherInformation(firstTeacher, secondTeacher);
      setMessage("Les formateurs ont été mis à jour !");
      setFirstTeacher("");
      setSecondTeacher("");
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-edit-teacher">
        <label htmlFor="firstTeacher" className="first-label-teacher">
          Enseignant 1 :
          <input
            type="text"
            className="first-input-teacher"
            id="firstTeacher"
            value={firstTeacher}
            onChange={(e) => setFirstTeacher(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="secondTeacher" className="second-label-teacher">
          Enseignant 2 :
          <input
            type="text"
            className="second-input-teacher"
            id="secondTeacher"
            value={secondTeacher}
            onChange={(e) => setSecondTeacher(e.target.value)}
          />
        </label>
        <br />
        <button
          className="button-type1 button-submit-teacher"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </form>
      {message && <p className="message-teacher">{message}</p>}
    </>
  );
}

export default EditTeacher;
