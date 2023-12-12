import { Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

import { useProviders } from "./useProviders";
import { useClient } from "./useClient";

export type LoginOptions = {
  maxTimeToLive?: bigint;
  derivationOrigin?: string | URL;
  windowOpenerFeatures?: string;
};

export type Auth = {
  connect: (options?: LoginOptions) => Promise<void>;
  disconnect: () => Promise<void>;
  isAuthenticated: () => boolean;
  getIdentity: () => Identity;
  getPrincipal: () => Principal;
};

export const useAuth = (): Auth => {
  const client = useClient();
  const providers = useProviders();
  const provider = providers["internet-identity"];

  async function connect(): Promise<void> {
    try {
      await provider.connect();
      const identity = provider.getIdentity();
      client.setIdentity(identity);
    } catch (error) {
      throw error;
    }
  }

  function disconnect(): Promise<void> {
    client.setIdentity();
    return provider.disconnect();
  }

  function isAuthenticated(): boolean {
    return provider.isAuthenticated();
  }

  function getIdentity(): Identity {
    return provider.getIdentity();
  }

  function getPrincipal(): Principal {
    return provider.getPrincipal();
  }

  return {
    connect,
    disconnect,
    isAuthenticated,
    getIdentity,
    getPrincipal,
  };
};
