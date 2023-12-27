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
import { CanisterTypes } from "./lib/canisters";

export default function App() {
  const [client, setClient] = useState<Client<Canisters> | undefined>();

  useEffect(() => {
    initClient();
  }, []);

  async function initClient() {
    const internetIdentity = new InternetIdentityReactNative({
      providerUrl: "https://6a02-177-228-109-161.ngrok-free.app?canisterId=aovwi-4maaa-aaaaa-qaagq-cai",
      appLink: "exp://127.0.0.1:8081/--/success", //TODO: Get this dynamically
    });

    const client = await Client.create<CanisterTypes>({
      host: "https://6a02-177-228-109-161.ngrok-free.app",
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
