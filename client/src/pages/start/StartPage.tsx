import { useEffect, useState } from "react";
import "./StartPage.css";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  teacher_1: string;
  teacher_2: string;
};

function StartPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const userId = 1;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accounts/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data: User) => {
        setUsername(data.username);
      });
  }, []);
  return (
    <>
      <header className="header-startpage">
        <img
          className="logo"
          src="./src/assets/images/logo.svg"
          alt="Code Quest Academy"
        />
        <button
          type="button"
          className="modif-info-button"
          onClick={() => navigate("/profile")}
        >
          Mon profil
        </button>
      </header>
      <main>
        <h2 className="hello-message">
          Bonjour <strong>{username}</strong>
        </h2>
        <section className="character-images">
          <img src="./src/assets/images/character/BrightFantine.png" alt="" />
          <img src="./src/assets/images/character/MiniSoufiane.png" alt="" />
          <img src="./src/assets/images/character/BigSoufiane.png" alt="" />
          <img src="./src/assets/images/character/Student.png" alt="" />
        </section>
        <section>
          <div className="progression-circle">79%</div>
          <button
            type="button"
            className="start-button"
            onClick={() => navigate("/game")}
          >
            Jouer !
          </button>
        </section>
      </main>
    </>
  );
}

export default StartPage;
