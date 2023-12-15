import { AnonymousIdentity, Identity } from "@dfinity/agent";
import { Client } from "icp-connect-core/client";
import React, { ReactNode, createContext, useEffect, useState } from "react";

export type IcpConnectContextType<T extends Record<string, any>> = {
  client: Client<T>;
  identity: Identity;
  isAuthenticated: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
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
    await authProvider.connect();
    const identity = authProvider.getIdentity();
    setIdentity(identity);
    client.setIdentity(identity);
    setIsAuthenticated(true);
  }

  async function disconnect() {
    await authProvider.disconnect();
    const identity = new AnonymousIdentity();
    setIdentity(identity);
    client.setIdentity(identity);
    setIsAuthenticated(false);
  }

  return (
    isReady && (
      <IcpConnectContext.Provider
        value={{
          client,
          identity,
          isAuthenticated,
          connect,
          disconnect,
        }}>
        {children}
      </IcpConnectContext.Provider>
    )
  );
};
