import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface ContextValue {
    account: AccountProps[];
  setAccount: React.Dispatch<React.SetStateAction<AccountProps[]>>;
  progress: ProgressProps[];
  setProgress: React.Dispatch<React.SetStateAction<ProgressProps[]>>;
};

interface AccountProps {
    id: number;
    username: string;
    email: string;
    password: string;
  };

  interface ProgressProps {
    level: number;
    user_id: number;
    room_id: number;
    challenge_id: number;
  }

  interface ProviderProps {
    children: ReactNode;
  }

  export const UserContext = createContext<ContextValue | null>(null);

  export const Provider = ({ children }: ProviderProps) => {
    const [account, setAccount] = useState([] as AccountProps[]);
    const [progress, setProgress] = useState([] as ProgressProps[]);
    
    // FETCH DE LA TABLE ACCOUNT
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/account`)
          .then((response) => response.json())
          .then((data: AccountProps[]) => {
            setAccount(data);
          });
      }, []);

      // FETCH DE LA TABLE PROGRESS
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/progress`)
      .then((response) => response.json())
      .then((data: ProgressProps[]) => {
        setProgress(data);
      });
  }, []);

  return (
    <UserContext.Provider
    value={{
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

export const useGameContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useGameContext must be used within a Provider");
  }
  return context;
};