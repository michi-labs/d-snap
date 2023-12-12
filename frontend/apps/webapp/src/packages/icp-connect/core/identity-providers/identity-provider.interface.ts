import { Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

export interface IdentityProvider {
  init: () => Promise<void>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isAuthenticated: () => boolean;
  getIdentity: () => Identity;
  getPrincipal: () => Principal;
}
