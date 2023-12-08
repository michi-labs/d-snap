import type { AppProps } from "next/app";

import { createClient } from "@connect2ic/core";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";
import { Connect2ICProvider } from "@connect2ic/react";
import "@connect2ic/core/style.css";

import * as test from "../icp/test";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Connect2ICProvider client={client}>
      <Component {...pageProps} />
    </Connect2ICProvider>
  );
}

const client = createClient({
  canisters: {
    // @ts-ignore
    test,
  },
  // @ts-ignore
  // providers: defaultProviders,
  providers: [
    new InternetIdentity({
      providerUrl: process.env.INTERNET_IDENTITY_URL,
    }),
  ],
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     * TODO: Set this from env
     */
    dev: true,
  },
});
