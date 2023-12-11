import { useContext } from "react";

import { IcpContext } from "../context";

export const useProviders = () => {
  const { client } = useContext(IcpContext);

  return client.getProviders();
};
