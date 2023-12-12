import { useContext } from "react";
import { IcpConnectContext } from "../context";

import { Client } from "../../../../packages/icp-connect/core";

export const useClient = <T extends Record<string, any>>(): Client<T> => {
  const { client } = useContext(IcpConnectContext);
  return client as Client<T>;
};
