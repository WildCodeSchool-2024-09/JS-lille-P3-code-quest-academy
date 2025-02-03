import { createContext, useEffect, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { AccountProps, ProgressProps } from "../types/user";

interface ContextValue {
  user: AccountProps | null;
  setUser: Dispatch<SetStateAction<AccountProps | null>>;
  userAuth: AccountProps | null;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUserAuth: Dispatch<SetStateAction<AccountProps | null>>;
  progress: ProgressProps | null;
  setProgress: Dispatch<SetStateAction<ProgressProps | null>>;
}

const defaultUserContextValue: ContextValue = {
  user: null,
  setUser: () => null,
  userAuth: null,
  token: null,
  setToken: () => null,
  setUserAuth: () => null,
  progress: null,
  setProgress: () => null,
};

interface ProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<ContextValue | null>(
  defaultUserContextValue,
);

export const Provider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<AccountProps | null>(null);
  const [userAuth, setUserAuth] = useState<AccountProps | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressProps | null>(null);

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
        userAuth,
        token,
        setToken,
        setUserAuth,
        progress,
        setProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
