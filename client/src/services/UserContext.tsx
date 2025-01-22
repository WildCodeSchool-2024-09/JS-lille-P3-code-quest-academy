import { createContext, useEffect, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface ContextValue {
  user: AccountProps | null;
  setUser: Dispatch<SetStateAction<AccountProps | null>>;
  account: AccountProps | null;
  setAccount: Dispatch<SetStateAction<AccountProps | null>>;
  progress: ProgressProps | null;
  setProgress: Dispatch<SetStateAction<ProgressProps | null>>;
}

const defaultUserContextValue: ContextValue = {
  user: null,
  setUser: () => null,
  account: null,
  setAccount: () => null,
  progress: null,
  setProgress: () => null,
};

interface AccountProps {
  id: number;
  username: string;
  email: string;
  password: string;
  teacher_1: string;
  teacher_2: string;
  room_id: number;
  challenge_id: number;
}

interface ProgressProps {
  id: number;
  level: number;
  user_id: number;
  room_id: number;
  challenge_id: number;
}

interface ProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<ContextValue | null>(
  defaultUserContextValue,
);

export const Provider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<AccountProps | null>(null);
  const [account, setAccount] = useState<AccountProps | null>(null);
  const [progress, setProgress] = useState<ProgressProps | null>(null);

  //----------------------------------------------------------
  // FETCH DE LA TABLE ACCOUNT
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accounts`)
      .then((response) => response.json())
      .then((data: AccountProps | null) => {
        setAccount(data);
      });
  }, []);

  //----------------------------------------------------------
  // FETCH DE LA TABLE PROGRESS QUAND LE USER EST CONNECTé

  useEffect(() => {
    if (!user) {
      return;
    }
    fetch(
      `${import.meta.env.VITE_API_URL}/api/progress/${user.id}/${
        user.room_id
      }/${user.challenge_id}`,
    )
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
        account,
        setAccount,
        progress,
        setProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
