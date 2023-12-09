import { ReactNode, createContext, useEffect, useState } from "react";

import { useActor } from "../../packages/icp/hooks/useActor";
import { useAuth } from "../../packages/icp/hooks/useAuth";

export type AuthUserProfile = {
  bio: string;
  username: string;
  picture: {
    url: string;
  };
  createdAt: string;
};

export type AuthContextType = {
  isAuth: boolean;
  profile?: AuthUserProfile;
  login: () => void;
  logout: () => void;
};

export type AuthContextProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const { isAuthenticated, login, logout } = useAuth();
  const userActor = useActor("user");
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [profile, setProfile] = useState<AuthUserProfile | undefined>();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    loadProfile();
  }, [isAuth]);

  async function init() {
    const auth = await isAuthenticated();
    setIsAuth(auth);
  }

  async function loadProfile() {
    if (isAuth) {
      try {
        // @ts-ignore
        const response = await userActor.getProfile();

        if (response.err) return;

        const profile: AuthUserProfile = {
          username: response.ok.username,
          bio: response.ok.bio,
          picture: response.ok.picture,
          createdAt: response.ok.createdAt,
        };
        setProfile(profile);
      } catch (error) {
        console.log({ error });
      }
    } else {
      setProfile(undefined);
    }
  }

  function pLogin() {
    login({
      onSuccess: () => {
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
        profile,
        login: pLogin,
        logout: pLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
