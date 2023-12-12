import { ReactNode, createContext } from "react";

import { Client } from "../core/client/client";
import { CanisterTypes } from "../../../declarations";

export type IcpConnectContextType = {
  client: Client<CanisterTypes>;
};

export type IcpConnectContextProviderType = {
  children: ReactNode;
  client: Client<CanisterTypes>;
};

export const IcpConnectContext = createContext({} as IcpConnectContextType);

export const IcpConnectContextProvider = ({
  children,
  client,
}: IcpConnectContextProviderType) => {
  return (
    <IcpConnectContext.Provider
      value={{
        client,
      }}
    >
      {children}
    </IcpConnectContext.Provider>
  );
};
