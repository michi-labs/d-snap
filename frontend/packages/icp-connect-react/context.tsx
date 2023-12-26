import { AnonymousIdentity, Identity } from "@dfinity/agent";
import { AppLinkParams, Client } from "icp-connect-core";
import React, { ReactNode, createContext, useEffect, useState } from "react";

export type IcpConnectContextType<T extends Record<string, any>> = {
  client: Client<T>;
  identity: Identity;
  isAuthenticated: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  onAppLinkOpened(params: AppLinkParams): Promise<void>;
};

export type IcpConnectContextProviderProps<T extends Record<string, any>> = {
  children: ReactNode;
  client: Client<T>;
};

export const IcpConnectContext = createContext<IcpConnectContextType<Record<string, any>>>({} as any);

export const IcpConnectContextProvider = <T extends Record<string, any>>({
  children,
  client,
}: IcpConnectContextProviderProps<T>) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [identity, setIdentity] = useState<Identity>(new AnonymousIdentity());

  const authProvider = client.getProviders()["internet-identity"];

  useEffect(() => {
    const identity = authProvider.getIdentity();

    setIdentity(identity);
    client.setIdentity(identity);

    if (!identity.getPrincipal().isAnonymous()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsReady(true);
  }, []);

  async function connect() {
    try {
      await authProvider.connect();

      if (authProvider.type === "web") {
        const identity = authProvider.getIdentity();
        client.setIdentity(identity);
        setIdentity(identity);
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw error;
    }
  }

  async function disconnect() {
    await authProvider.disconnect();
    const identity = new AnonymousIdentity();
    setIdentity(identity);
    client.setIdentity(identity);
    setIsAuthenticated(false);
  }

  async function onAppLinkOpened(params: AppLinkParams) {
    if (authProvider.type !== "native") {
      console.warn("onAppLinkOpened only should called in native apps");
    }

    if (authProvider.onAppLinkOpened) {
      await authProvider.onAppLinkOpened(params);

      const identity = authProvider.getIdentity();
      client.setIdentity(identity);
      setIdentity(identity);
      setIsAuthenticated(true);
    }
  }

  return (
    isReady && (
      <IcpConnectContext.Provider
        // TODO: useMemo is recommended here
        value={{
          client,
          identity,
          isAuthenticated,
          connect,
          disconnect,
          onAppLinkOpened,
        }}>
        {children}
      </IcpConnectContext.Provider>
    )
  );
};
