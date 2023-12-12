import { useContext } from "react";
import { IcpContext } from "../context";

import { Client } from "@/packages/icp/core";
import { CanisterTypes } from "../../../../declarations";

export const useClient = (): Client<CanisterTypes> => {
  const { client } = useContext(IcpContext);
  return client;
};
