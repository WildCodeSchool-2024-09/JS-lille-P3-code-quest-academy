import { useEffect, useState } from "react";
import "./AdminManagement.css";
import EditUser from "./EditUser";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

function AdminManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  // Gère la liste des utilisateurs avec la barre de recherche
  const [searchQuery, setSearchQuery] = useState("");
  // Contrôle le tri par ordre alphabétique
  const [isAsc, setIsAsc] = useState(true);
  // Détermine si le formulaire d'edition est affiché et quel utilisateur est en cours de modification
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // ------------------------------------- //
  //   Appel API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accounts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: User[]) => {
        setUsers(data);
        setFilteredUsers(data);
      });
  }, []);

  // ----------------------------------- //
  //   Recherche d'utilisateur
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query),
      );
      setFilteredUsers(filtered);
    }
  };

  // ------------------------------------- //
  const sortUsers = (key: "username" | "email") => {
    // key: "" nous permet d'utiliser le code plusieurs fois selon ce que l'on souhaite trier
    const sorted = [...filteredUsers].sort((a, b) => {
      // J'extrait les chiffres des chaines de caractères
      const numA = Number.parseInt(a[key].replace(/\D/g, ""));
      // replace(/\D/g, "") permet de retirer tous les caractères qui ne sont pas des chiffres
      // a fin de faire le tri de manière alphabétique et numérique
      // ça évite d'avoir : user1 > user10 > user11 > user2 > user21 > user3
      const numB = Number.parseInt(b[key].replace(/\D/g, ""));
      return isAsc ? numA - numB : numB - numA;
    });

    setFilteredUsers(sorted);
    setIsAsc(!isAsc);
  };

  // ------------------------------------ //
  const startEditingUser = (user: User) => {
    setEditingUser(user);
  };
  // fonction callback qui permet à EditUser de notifier à AdminManagement qu'un utilisateur a été modifier
  // sert à actualiser la liste des utilisateurs
  const handleUserUpdate = (updatedUser: User) => {
    // map pour parcourir tous les utilisateurs
    const updatedUsers = users.map((user) =>
      // si l'id de l'utilisateur correspond àcelui de updateduser alors on le change, sinon on n'y touche pas
      user.id === updatedUser.id ? updatedUser : user,
    );
    // mise à jour de la liste principale users
    setUsers(updatedUsers);
    // mise à jour de la liste des utilisateurs filtrés
    setFilteredUsers(updatedUsers);
    // sert à fermer l'interface d'édition quand l'utilisateur a été modifié
    setEditingUser(null);
  };

  // ---------------------------------- //
  const deleteUser = (id: number) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Erreur : ${response.status} - ${response.statusText}`,
            );
          }

          const updatedUsers = users.filter((user) => user.id !== id);

          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression =>", error);
        });
    }
  };

  return (
    <section className="user-table-container">
      <h2>Liste des utilisateurs</h2>
      <input
        type="text"
        placeholder="recherche par nom ou email..."
        value={searchQuery}
        onChange={handleSearch}
        className="user-search-bar"
      />
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>
              Nom d'utilisateur
              <button type="button" onClick={() => sortUsers("username")}>
                Trier {isAsc ? "↓" : "↑"}
              </button>
            </th>
            <th>
              Email
              <button type="button" onClick={() => sortUsers("email")}>
                Trier {isAsc ? "↓" : "↑"}
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button type="button" onClick={() => startEditingUser(user)}>
                  Modifier
                </button>
                <button type="button" onClick={() => deleteUser(user.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <EditUser user={editingUser} onUpdate={handleUserUpdate} />
      )}
    </section>
  );
}

export default AdminManagement;
