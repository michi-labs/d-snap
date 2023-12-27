// @ts-ignore
import { ExpoRoot } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import { Client } from "icp-connect-core/client";
import { InternetIdentityReactNative } from "icp-connect-react-native/identity-providers";
import { IcpConnectContextProvider } from "icp-connect-react/context";

// @ts-ignore
import { IC_HOST, INTERNET_IDENTITY_URL } from "@env";
import { Canisters } from "./canisters";
import { AuthContextProvider } from "./lib/auth/auth-context";

export default function App() {
  const [client, setClient] = useState<Client<Canisters> | undefined>();

  useEffect(() => {
    initClient();
  }, []);

  async function initClient() {
    const internetIdentity = new InternetIdentityReactNative({
      providerUrl: INTERNET_IDENTITY_URL,
      appLink: "exp://192.168.0.125:8081/--/success", //TODO: Get this dinamically
    });

    const client = await Client.create<Canisters>({
      host: IC_HOST,
      canisters: Canisters,
      providers: {
        "internet-identity": internetIdentity,
      },
    });

    setClient(client);
  }

  const ctx = require.context("../app");

  return client ? (
    // @ts-ignore
    <IcpConnectContextProvider client={client}>
      <AuthContextProvider>
        <ExpoRoot context={ctx} />
      </AuthContextProvider>
    </IcpConnectContextProvider>
  ) : (
    <Text>Loading...</Text>
  );
}
