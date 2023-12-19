import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

const SuccessPage: React.FC = () => {
  const { slug } = useLocalSearchParams();
  useEffect(() => {
    console.log("Success");
  }, []);

  return (
    <View>
      <Text>Success</Text>
    </View>
  );
};

export default SuccessPage;
