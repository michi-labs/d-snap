import { IdentityProvider } from "./identity-provider.interface";

export interface NativeIdentityProvider extends IdentityProvider {
  /**
   * Dispatch this event when the redirect_uri has been successfully opened
   */
  successHandler(url: string): Promise<void>;
}
