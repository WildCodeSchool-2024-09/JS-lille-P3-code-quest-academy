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
    fetch(`${import.meta.env.VITE_API_URL}/api/users`)
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
  //    Tri des utilisateurs
  const sortUsers = (key: "username" | "email") => {
    // key: "" nous permet d'utiliser le code plusieurs fois selon ce que l'on souhaite trier
    const sorted = [...filteredUsers].sort((a, b) => {
      if (isAsc) return a[key].localeCompare(b[key]);
      return b[key].localeCompare(a[key]);
    });
    setFilteredUsers(sorted);
    setIsAsc(!isAsc);
  };

  // ------------------------------------ //
  // Modifier les utilisateurs
  const startEditingUser = (user: User) => {
    setEditingUser(user);
  };
  // fonction callback qui permet à EditUser de notifier à AdminManagement qu'un utilisateur a été modifier
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
  // Supprimer les utilisateurs
  const deleteUser = (userId: number) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la suppression.");
          }
          // Mise à jour de la liste des utilisateurs
          const updatedUsers = users.filter((user) => user.id !== userId);
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression :", error);
        });
    }
  };

  return (
    <div className="user-table-container">
      <h1>Liste des utilisateurs</h1>
      <input
        type="text"
        placeholder="recheche par nom ou eamil..."
        value={searchQuery}
        onChange={handleSearch}
        className="user-search-bar"
      />
      {/* la balise table c'est pour représenter sous forme de tableau */}
      <table className="user-table">
        {/* la blaise thead c'est pour nommer les colonnes */}
        <thead>
          {/* la blaise tr représente une ligne dans le tableau */}
          <tr>
            {/* la blaise th représente l'entête d'une celulle */}
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
            <th>Mot de passe</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* la blaise tbody contient les lignes principales */}
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              {/* la blaise td représente une celulle du tableau */}
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{"*".repeat(user.password.length)}</td>
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
    </div>
  );
}

export default AdminManagement;
