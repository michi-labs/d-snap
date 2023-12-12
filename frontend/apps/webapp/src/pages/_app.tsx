import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import "../app/globals.css";

import { Client } from "../packages/icp/core/client/client";
import { IcpContextProvider } from "../packages/icp/react/context";
import { AuthContextProvider } from "../lib/auth/auth-context";

import * as test from "@/declarations/test";
import * as user from "@/declarations/user";
import { InternetIdentity } from "@/packages/icp/core/identity-providers/internet-identity";
import { CanisterTypes } from "dsnap/declarations";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client<CanisterTypes> | undefined>();

  const Canisters = {
    test,
    user,
  };

  useEffect(() => {
    initClient();
  }, []);

  async function initClient() {
    const internetIdentity = new InternetIdentity({
      providerUrl: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL,
    });

    const client = await Client.create<CanisterTypes>({
      host: process.env.NEXT_PUBLIC_IC_HOST!,
      canisters: Canisters,
      providers: {
        "internet-identity": internetIdentity,
      },
    });

    setClient(client);
  }

  return client ? (
    <IcpContextProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </IcpContextProvider>
  ) : (
    <div>Loading</div>
  );
}
