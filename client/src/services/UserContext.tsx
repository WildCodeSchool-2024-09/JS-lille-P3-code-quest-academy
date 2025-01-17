import { createContext, useEffect, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface ContextValue {
  user: AccountProps | null;
  setUser: Dispatch<SetStateAction<AccountProps | null>>;
  account: AccountProps[];
  setAccount: Dispatch<SetStateAction<AccountProps[]>>;
  progress: ProgressProps[];
  setProgress: Dispatch<SetStateAction<ProgressProps[]>>;
}

const defaultUserContextValue: ContextValue = {
  user: null,
  setUser: () => null,
  account: [],
  setAccount: () => [],
  progress: [],
  setProgress: () => [],
};

interface AccountProps {
  id: number;
  username: string;
  email: string;
  password: string;
  teacher_1: string;
  teacher_2: string;
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
  const [account, setAccount] = useState<AccountProps[]>([]);
  const [progress, setProgress] = useState<ProgressProps[]>([]);

  //----------------------------------------------------------
  // FETCH DE LA TABLE ACCOUNT
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accounts`)
      .then((response) => response.json())
      .then((data: AccountProps[]) => {
        setAccount(data);
      });
  }, []);

  //----------------------------------------------------------
  // FETCH DE LA TABLE PROGRESS QUAND LE USER EST CONNECté

  useEffect(() => {
    if (!user) {
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/progress/${user.id}`)
      .then((response) => response.json())
      .then((data: ProgressProps[]) => {
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

// export const useGameContext = () => {
//   const userContext = useContext(UserContext);
//   if (!userContext) {
//     throw new Error("useGameContext must be used within a Provider");
//   }
//   return userContext;
// };
