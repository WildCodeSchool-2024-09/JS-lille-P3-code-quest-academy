import { useState } from "react";
import "./EditTeachers.css";

function EditTeacher() {
  const [teacher_1, setTeacher_1] = useState("");
  const [teacher_2, setTeacher_2] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!teacher_1 || !teacher_2) {
      setMessage("Veuillez remplir les deux champs.");
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
          body: JSON.stringify({ teacher_1, teacher_2 }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(`${teacher_1} et ${teacher_2} sont avec vous !!`);
        setTeacher_1("");
        setTeacher_2("");
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
        <label htmlFor="teacher_1">
          Enseignant 1 :
          <input
            type="text"
            id="teacher_1"
            value={teacher_1}
            onChange={(e) => setTeacher_1(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="teacher_2">
          Enseignant 2 :
          <input
            type="text"
            id="teacher_2"
            value={teacher_2}
            onChange={(e) => setTeacher_2(e.target.value)}
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

export default EditTeacher;
