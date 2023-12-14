import { CanisterTypes } from "@/declarations";
import { ActorMap } from "icp-connect-core/client";
import { useActor, useAuth } from "icp-connect-react/hooks";
import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthUserProfile = {
  bio: string;
  username: string;
  picture: {
    url: string;
  };
  createdAt: bigint;
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
  // TODO: Improve this type, example below is not working
  // For now we need to force the type to infer the correct type
  // const user = useActor<CanisterTypes>("user");
  const user = useActor<CanisterTypes>("user") as ActorMap<CanisterTypes>["user"];

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [profile, setProfile] = useState<AuthUserProfile | undefined>();

  useEffect(() => {
    loadProfile();
  }, [isAuth]);

  async function loadProfile() {
    if (isAuth) {
      try {
        const response = await user.getProfile();

        if ("err" in response) return;

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
      }}>
      {children}
    </AuthContext.Provider>
  );
};
