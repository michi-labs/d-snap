import { AnonymousIdentity, Identity } from "@dfinity/agent";
import { Client } from "icp-connect-core/client";
import React, { ReactNode, createContext, useEffect, useState } from "react";

export type IcpConnectContextType<T extends Record<string, any>> = {
  client: Client<T>;
  isAuthenticated: boolean;
  identity: Identity;
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
  // TODO: implement select auth provider
  const [currentAuthProvider, setCurrentAuthProvider] = useState<string | null>("internet-identity");
  const authProvider = currentAuthProvider ? client.getProviders()[currentAuthProvider] : undefined;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authProvider?.isAuthenticated() || false);
  const [identity, setIdentity] = useState<any>(authProvider?.getIdentity() || new AnonymousIdentity());

  useEffect(() => {
    client.setIdentity(identity);
    setIdentity(identity);
  }, [isAuthenticated]);

  async function connect() {
    await authProvider?.connect();
    setIsAuthenticated(true);
  }

  async function disconnect() {
    await authProvider?.disconnect();
    setIsAuthenticated(false);
  }

  return (
    <IcpConnectContext.Provider
      value={{
        client,
        isAuthenticated,
        identity,
        connect,
        disconnect,
      }}>
      {children}
    </IcpConnectContext.Provider>
  );
};
