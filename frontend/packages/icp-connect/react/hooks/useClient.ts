import { useContext } from "react";
import { IcpConnectContext } from "../context";

import { Client } from "../../../../packages/icp-connect/core";
import { CanisterTypes } from "../../../../declarations";

export const useClient = (): Client<CanisterTypes> => {
  const { client } = useContext(IcpConnectContext);
  return client;
};
