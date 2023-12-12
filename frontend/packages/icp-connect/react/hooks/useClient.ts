import { CanisterTypes } from "../../../../declarations";
import { Client } from "../../../../packages/icp-connect/core";
import { IcpConnectContext } from "../context";
import { useContext } from "react";

export const useClient = (): Client<CanisterTypes> => {
  const { client } = useContext(IcpConnectContext);
  return client;
};
