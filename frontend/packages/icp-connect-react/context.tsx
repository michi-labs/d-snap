import { Client } from "icp-connect-core/client";
import React, { ReactNode, createContext, useEffect, useState } from "react";

export type IcpConnectContextType<T extends Record<string, any>> = {
  client: Client<T>;
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
  // TODO: implement select auth provider
  const [currentAuthProvider, setCurrentAuthProvider] = useState<string | null>("internet-identity");
  const authProvider = currentAuthProvider ? client.getProviders()[currentAuthProvider] : undefined;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const identity = authProvider?.getIdentity();

    if (!identity?.getPrincipal().isAnonymous()) {
      client.setIdentity(identity);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  async function connect() {
    if (!authProvider) throw new Error("No auth provider selected");

    await authProvider?.connect();
    const identity = authProvider?.getIdentity();
    client.setIdentity(identity);
    setIsAuthenticated(true);
  }

  async function disconnect() {
    await authProvider?.disconnect();
    client.setIdentity();
    setIsAuthenticated(false);
  }

  return (
    <IcpConnectContext.Provider
      value={{
        client,
        isAuthenticated,
        connect,
        disconnect,
      }}>
      {children}
    </IcpConnectContext.Provider>
  );
};
