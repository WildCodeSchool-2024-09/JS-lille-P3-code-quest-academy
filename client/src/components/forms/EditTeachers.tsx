import { useState } from "react";
import "./EditTeachers.css";

type EditTeacherProps = {
  updateTeacherInformation: (teacher_1: string, teacher_2: string) => void;
};

function EditTeacher({ updateTeacherInformation }: EditTeacherProps) {
  const [teacher_1, setTeacher_1] = useState("");
  const [teacher_2, setTeacher_2] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userId = 1;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!teacher_1 || !teacher_2) {
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
          body: JSON.stringify({ teacher_1, teacher_2 }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `${teacher_1} et ${teacher_2} sont désormais vos enseignants !`,
        );

        updateTeacherInformation(teacher_1, teacher_2);

        setTeacher_1("");
        setTeacher_2("");
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
