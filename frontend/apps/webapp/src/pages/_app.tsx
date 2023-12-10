import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import "../app/globals.css";

import { Client } from "../packages/icp/core/client/client";
import { IcpContextProvider } from "../packages/icp/react/context";
import { AuthContextProvider } from "../lib/auth/auth-context";

import * as test from "@/declarations/test";
import * as user from "@/declarations/user";
import { InternetIdentity } from "@/packages/icp/core/providers/internet-identity/internet-identity";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client | undefined>();

  useEffect(() => {
    initClient();
  }, []);

  async function initClient() {
    const internetIdentity = await InternetIdentity.create({
      providerUrl: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL,
    });

    const client = Client.create({
      host: process.env.NEXT_PUBLIC_IC_HOST!,
      canisters: {
        // @ts-ignore
        test,
        // @ts-ignore
        user,
      },
      providers: {
        // @ts-ignore
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
