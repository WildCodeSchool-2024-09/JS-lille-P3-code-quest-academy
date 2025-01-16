import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface ContextValue {
  user: AccountProps | null;
  setUser: Dispatch<SetStateAction<AccountProps | null>>;
}

interface AccountProps {
  id: number;
  username: string;
  email: string;
  password: string;
  teacher_1: string;
  teacher_2: string;
}

interface ProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<ContextValue | null>(null);

export const Provider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<AccountProps | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useGameContext = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useGameContext must be used within a Provider");
  }
  return userContext;
};
