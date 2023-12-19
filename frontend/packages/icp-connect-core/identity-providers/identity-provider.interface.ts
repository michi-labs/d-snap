import { Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

export interface IdentityProvider {
  type: "web" | "native";
  init: () => Promise<void>;
  getName: () => string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isAuthenticated: () => boolean;
  getIdentity: () => Identity;
  getPrincipal: () => Principal;
  // This is mandatory if type is "native"
  onAppLinkOpened?: (params: URLSearchParams) => Promise<void>;
}
