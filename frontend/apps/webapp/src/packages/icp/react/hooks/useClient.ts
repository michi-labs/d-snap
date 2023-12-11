import { useContext } from "react";
import { IcpContext } from "../context";

import { Client } from "@/packages/icp/core";

export const useClient = (): Client => {
  const { client } = useContext(IcpContext);
  return client;
};
