import { useAuth } from "icp-connect-react/hooks";
import { useEffect } from "react";
import { Text, View } from "react-native";

const SuccessPage = () => {
  const { onAppLinkOpened } = useAuth();

  // TODO: Execute here onAppLinkOpened

  useEffect(() => {
    console.log("success");
  }, []);
  return (
    <View>
      <Text>Mobile App</Text>
      <Text>Coming soon...</Text>
    </View>
  );
};

export default SuccessPage;
