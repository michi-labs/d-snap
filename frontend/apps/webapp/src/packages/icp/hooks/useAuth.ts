import { useContext } from "react";
import { Identity } from "@dfinity/agent";

import { useProvider } from "./useProvider";
import { IcpContext } from "../context";

export type LoginOptions = {
  maxTimeToLive?: bigint;
  derivationOrigin?: string | URL;
  windowOpenerFeatures?: string;
  onSuccess?: (() => void) | (() => Promise<void>);
  onError?: ((error?: string) => void) | ((error?: string) => Promise<void>);
};

export type LogoutOptions = {
  returnTo?: string | undefined;
};

export type Auth = {
  login: (options?: LoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => Promise<void>;
  isAuthenticated: () => Promise<boolean>;
  getIdentity: () => Identity;
};

export const useAuth = (): Auth => {
  const { client } = useContext(IcpContext);
  const auth = client.getAuth();

  const provider = useProvider("internet-identity");

  function login(options: LoginOptions = {}): Promise<void> {
    const identityProvider = provider.url || "https://identity.ic0.app";

    const onSuccess = () => {
      const identity = auth.getIdentity();
      client.replaceIdentity(identity);

      options.onSuccess?.();
    };

    const opts = {
      identityProvider,
      ...options,
      onSuccess,
    };

    return auth.login(opts);
  }

  function logout(options: LogoutOptions = {}): Promise<void> {
    client.replaceIdentity();
    return auth.logout(options);
  }

  function isAuthenticated(): Promise<boolean> {
    return auth.isAuthenticated();
  }

  function getIdentity(): Identity {
    return auth.getIdentity();
  }

  return {
    login,
    logout,
    isAuthenticated,
    getIdentity,
  };
};
