import { createContext, useEffect, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { AccountProps, ProgressProps } from "../types/user";

interface ContextValue {
  user: AccountProps | null;
  setUser: Dispatch<SetStateAction<AccountProps | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  progress: ProgressProps | null;
  setProgress: Dispatch<SetStateAction<ProgressProps | null>>;
}

interface ProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<ContextValue | null>(null);

export const Provider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<AccountProps | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressProps | null>(null);

  //----------------------------------------------------------
  // Using the token stored in the localStorage to get user's info

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      fetch(`${import.meta.env.VITE_API_URL}/api/accountbytoken`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erreur lors de la récupération de l'utilisateur");
          }
          return res.json();
        })
        .then((user) => {
          setUser(user);
        })
        .catch((err) => {
          console.error("Erreur de récupération de l'utilisateur :", err);
          if (err.message.includes("401")) {
            console.warn(
              "Token expiré ou invalide, suppression du localStorage",
            );
            localStorage.removeItem("token"); // We delete only if the token is really invalid
            setToken(null);
            setUser(null);
          }
        });
    }
  }, []);

  //----------------------------------------------------------
  // FETCH PROGRESS TABLE WHEN USER IS CONNECTED

  useEffect(() => {
    if (!user) {
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/progress/${user.id}`)
      .then((response) => response.json())
      .then((data: ProgressProps | null) => {
        setProgress(data);
      });
  }, [user]);
  //----------------------------------------------------------

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        progress,
        setProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
