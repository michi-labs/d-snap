import { CanisterTypes } from "@/declarations";
import { ActorMap } from "icp-connect-core/client";
import { useActor, useAuth } from "icp-connect-react/hooks";
import { ReactNode, createContext, useEffect, useState } from "react";
import z from "zod";

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

const ZUserProfileSchema = z.object({
  bio: z.string(),
  username: z.string(),
  picture: z.object({
    url: z.string(),
  }),
  createdAt: z.bigint(),
});

const ZResponseSchema = z
  .object({
    ok: ZUserProfileSchema.optional(),
    err: z.object({}).optional(),
  })
  .refine((data) => (data.ok !== undefined) !== (data.err !== undefined), {
    message: 'Either "ok" or "err" should be present, but not both.',
  });

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

        const responseParse = ZResponseSchema.safeParse(response);

        if (!responseParse.success) throw new Error(`Invalid response schema: ${responseParse.error}`);
        if (responseParse.success && "err" in responseParse.data) {
          // No profile found
          return;
        }

        const profile: AuthUserProfile = {
          username: responseParse.data?.ok?.username || "",
          bio: responseParse.data?.ok?.bio || "",
          picture: responseParse.data?.ok?.picture || { url: "" },
          createdAt: responseParse.data?.ok?.createdAt || BigInt(0),
        };

        setProfile(profile);
      } catch (error) {
        console.log({ error });
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
