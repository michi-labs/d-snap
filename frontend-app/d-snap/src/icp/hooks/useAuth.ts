import { AuthClient } from "@dfinity/auth-client";
import { useEffect, useState } from "react";
import { useProvider } from "./useProvider";
import { Identity } from "@dfinity/agent";

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
  isReady: boolean;
  login: (options?: LoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => Promise<void>;
  isAuthenticated: () => Promise<boolean>;
  getIdentity: () => Identity;
};

export const useAuth = (): Auth => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [client, setClient] = useState<AuthClient | undefined>(undefined);

  const provider = useProvider("internet-identity");

  useEffect(() => {
    init();
  });

  async function init() {
    const client = await AuthClient.create();
    setClient(client);
    setIsReady(true);
  }

  function login(options: LoginOptions = {}): Promise<void> {
    if (!client) throw new Error("Auth is not ready");

    const identityProvider = provider.url || "https://identity.ic0.app";
    const opts = {
      identityProvider,
      ...options,
    };
    return client?.login(opts);
  }

  function logout(options: LogoutOptions = {}): Promise<void> {
    if (!client) throw new Error("Auth is not ready");

    return client?.logout(options);
  }

  function isAuthenticated(): Promise<boolean> {
    if (!client) throw new Error("Auth is not ready");

    return client?.isAuthenticated();
  }

  function getIdentity(): Identity {
    if (!client) throw new Error("Auth is not ready");

    return client?.getIdentity();
  }

  return {
    isReady,
    login,
    logout,
    isAuthenticated,
    getIdentity,
  };
};
