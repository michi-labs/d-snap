import { Client } from "icp-connect-core/client";
import React, { ReactNode, createContext } from "react";

export type IcpConnectContextType<T extends Record<string, any>> = {
  client: Client<T>;
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
  return (
    <IcpConnectContext.Provider
      value={{
        client,
      }}>
      {children}
    </IcpConnectContext.Provider>
  );
};