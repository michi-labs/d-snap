import { useContext } from "react";

import { IcpContext } from "../context";

export const useProvider = (name: string) => {
  const { client } = useContext(IcpContext);

  const provider = client.getProvider(name);

  if (!provider) throw new Error("This provider doesn't exist");

  return provider;
};
