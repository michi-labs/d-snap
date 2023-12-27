import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { useContext, useEffect } from "react";
import { Text, View } from "react-native";

import { AppLinkParams } from "icp-connect-core";
import { useAuth } from "icp-connect-react/hooks";

import { AuthContext, AuthContextProvider } from "../src/lib/auth/auth-context";

const SuccessPage = () => {
  const { onAppLinkOpened } = useAuth();
  const { profile } = useContext(AuthContext);

  const params = useLocalSearchParams<AppLinkParams>();

  useEffect(() => {
    async function onLoad() {
      const { delegation, publicKey } = params;

      if (delegation && publicKey) {
        await onAppLinkOpened({ delegation, publicKey });
        // TODO: Navigate Profile
      } else {
        console.warn("Invalid App Link Params");
      }
    }

    onLoad();
  }, []);

  return (
    <AuthContextProvider>
      <View>
        <Text>Success page</Text>
        {/* <Text>{params.delegation}</Text> */}
        {/* <Text>{JSON.stringify(profile)}</Text> */}
        <Link replace href="/home/feed">
          <Text>Go Home</Text>
        </Link>
      </View>
    </AuthContextProvider>
  );
};

export default SuccessPage;
