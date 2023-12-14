import { IcpConnectContext } from "../context";
import { Identity } from "@dfinity/agent";
import { useContext } from "react";

export type LoginOptions = {
  maxTimeToLive?: bigint;
  derivationOrigin?: string | URL;
  windowOpenerFeatures?: string;
};

export type Auth = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isAuthenticated: boolean;
  identity: Identity;
};

export const useAuth = (): Auth => {
  const { connect, disconnect, isAuthenticated, identity } = useContext(IcpConnectContext);

  return {
    connect,
    disconnect,
    isAuthenticated,
    identity,
  };
};
