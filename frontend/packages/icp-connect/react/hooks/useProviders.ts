import { IcpConnectContext } from "../context";
import { useContext } from "react";

export const useProviders = () => {
  const { client } = useContext(IcpConnectContext);

  return client.getProviders();
};
