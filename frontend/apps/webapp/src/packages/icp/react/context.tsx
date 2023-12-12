import { ReactNode, createContext } from "react";

import { Client } from "../core/client/client";
import { CanisterTypes } from "dsnap/declarations";

export type IcpContextType = {
  client: Client<CanisterTypes>;
};

export type IcpContextProviderType = {
  children: ReactNode;
  client: Client<CanisterTypes>;
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
