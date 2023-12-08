import { useAuth } from "dsnap/packages/icp/hooks/useAuth";
import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextType = {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
};

export type AuthContextProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const { isAuthenticated, login, logout } = useAuth();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const auth = await isAuthenticated();
    console.log({ auth });
    setIsAuth(auth);
  }

  function pLogin() {
    login({
      onSuccess: () => {
        console.log("onSuccess from auth context");
        setIsAuth(true);
      },
    });
  }

  async function pLogout() {
    await logout();
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        login: pLogin,
        logout: pLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
