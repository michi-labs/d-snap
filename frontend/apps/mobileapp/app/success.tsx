import { useEffect } from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from 'expo-router';

import { useAuth } from "icp-connect-react/hooks";
import { AppLinkParams } from "icp-connect-core";

const SuccessPage = () => {
  const { onAppLinkOpened } = useAuth();

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
    <View>
      <Text>Success page</Text>
      <Text>{params.delegation}</Text>
    </View>
  );
};

export default SuccessPage;
