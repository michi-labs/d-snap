import { AuthContext } from "../lib/auth/auth-context";
import { useRouter } from "next/router";
import { useContext } from "react";

export type AuthGuardOptions = {
  isPrivate: boolean;
};

export function useAuthGuard(options: AuthGuardOptions) {
  const router = useRouter();
  const { isAuthenticated, profile } = useContext(AuthContext);

  if (isAuthenticated && router.pathname === "/login") {
    router.push("feed");
    return;
  }

  if (options.isPrivate && !isAuthenticated) {
    router.push("login");
    return;
  }

  if (options.isPrivate && !profile) {
    router.push("profile");
    return;
  }
}
