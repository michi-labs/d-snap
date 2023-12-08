import { ReactNode, createContext } from "react";

import { Client } from "./client";

export type IcpContextType = {
  client: Client;
};

export type IcpContextProviderType = {
  children: ReactNode;
  client: Client;
};

export const IcpContext = createContext({} as IcpContextType);

export const IcpContextProvider = ({
  children,
  client,
}: IcpContextProviderType) => {
  return (
    <IcpContext.Provider
      value={{
        client,
      }}
    >
      {children}
    </IcpContext.Provider>
  );
};
