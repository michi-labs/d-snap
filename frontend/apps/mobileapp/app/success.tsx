import { useEffect } from "react";
import { Text, View } from "react-native";

const SuccessPage = () => {
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
