import { CanisterTypes } from "../canisters";
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
  profile?: AuthUserProfile;
  isAuthenticated: boolean;
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
  const { isAuthenticated } = useAuth();
  // TODO: Improve this type, example below is not working
  // For now we need to force the type to infer the correct type
  // const user = useActor<CanisterTypes>("user");
  const user = useActor<CanisterTypes>("user") as ActorMap<CanisterTypes>["user"];

  const [profile, setProfile] = useState<AuthUserProfile | undefined>();

  useEffect(() => {
    async function loadProfile() {
      if (isAuthenticated) {
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
    loadProfile();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        profile,
        isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
