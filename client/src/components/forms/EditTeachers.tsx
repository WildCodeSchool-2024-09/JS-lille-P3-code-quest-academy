import { useState } from "react";
import "./EditTeachers.css";

type EditTeacherProps = {
  updateTeacherInformation: (
    firstTeacher: string,
    secondTeacher: string,
  ) => void;
};

function EditTeacher({ updateTeacherInformation }: EditTeacherProps) {
  const [firstTeacher, setfirstTeacher] = useState("");
  const [secondTeacher, setsecondTeacher] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userId = 1;

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

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `${firstTeacher} et ${secondTeacher} sont désormais vos enseignants !`,
        );

        updateTeacherInformation(firstTeacher, secondTeacher);

        setfirstTeacher("");
        setsecondTeacher("");
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
      <form onSubmit={handleSubmit} className="form-edit-teacher">
        <label htmlFor="firstTeacher" className="first-label-teacher">
          Enseignant 1 :
          <input
            type="text"
            className="first-input-teacher"
            id="firstTeacher"
            value={firstTeacher}
            onChange={(e) => setfirstTeacher(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="secondTeacher" className="second-label-teacher">
          Enseignant 2 :
          <input
            type="text"
            className="second-input-teacher"
            id="second-input-teacher"
            value={secondTeacher}
            onChange={(e) => setsecondTeacher(e.target.value)}
          />
        </label>
        <br />
        <button
          className="button-sumbmit-teacher"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Mise à jour..." : "Mettre à jour"}{" "}
        </button>
      </form>
      {message && <p className="message-teacher">{message}</p>}
    </div>
  );
}

export default EditTeacher;
