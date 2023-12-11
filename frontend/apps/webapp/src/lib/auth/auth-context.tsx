import { ReactNode, createContext, useEffect, useState } from "react";

import { useActor } from "../../packages/icp/react/hooks/useActor";
import { useAuth } from "../../packages/icp/react/hooks/useAuth";

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
  const { connect, disconnect } = useAuth();
  const user = useActor("user");
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [profile, setProfile] = useState<AuthUserProfile | undefined>();

  useEffect(() => {
    loadProfile();
  }, [isAuth]);

  async function loadProfile() {
    if (isAuth) {
      try {
        // @ts-ignore
        const response = await user.getProfile();

        if (response.err) return;

        const profile: AuthUserProfile = {
          username: response.ok.username,
          bio: response.ok.bio,
          picture: response.ok.picture,
          createdAt: response.ok.createdAt,
        };
        setProfile(profile);
      } catch (error) {
        throw error;
      }
    } else {
      setProfile(undefined);
    }
  }

  async function login() {
    try {
      await connect();
      setIsAuth(true);
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    await disconnect();
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        profile,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
