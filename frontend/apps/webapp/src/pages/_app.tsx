import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import "../app/globals.css";

import { Client } from "../packages/icp-connect/core/client/client";
import { IcpConnectContextProvider } from "../packages/icp-connect/react/context";
import { AuthContextProvider } from "../lib/auth/auth-context";

import { InternetIdentity } from "dsnap/packages/icp-connect/core/identity-providers/internet-identity";
import { CanisterTypes, Canisters } from "../declarations";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client<CanisterTypes> | undefined>();

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
    <IcpConnectContextProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </IcpConnectContextProvider>
  ) : (
    <div>Loading</div>
  );
}
