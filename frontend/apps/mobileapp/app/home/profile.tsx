import React, { useContext, useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";

import { ActorMap } from "icp-connect-core";
import { useActor } from "icp-connect-react/hooks";

import { AuthContext } from "../../src/lib/auth/auth-context";
import { Canisters } from "../../src/canisters";


const ProfilePage = () => {
  const user = useActor<Canisters>("user") as ActorMap<Canisters>["user"];
  const { profile } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  return (
    <View className="bg-white h-full w-full flex-1 flex-col items-center justify-center">
      <Text>Profile Page</Text>
      {profile && <Text>{JSON.stringify(profile)}</Text>}
      {/* Image upload */}
      <TextInput
        placeholder="Username"
        onChangeText={(value) => {
          setUsername(value);
        }}
        className="text-sm h-10 w-64 rounded border border-gray-300 focus:outline-none focus:border-purple-500 px-4 my-2"
      />
      <TextInput
        placeholder="Bio"
        onChangeText={(value) => {
          setBio(value);
        }}
        className="text-sm h-10 w-64 rounded border border-gray-300 focus:outline-none focus:border-purple-500 px-4 my-2"
      />
      <Text className="text-black text-sm">
        {JSON.stringify(username)} {JSON.stringify(bio)}
      </Text>
      <Pressable
        className="bg-purple-600 text-white px-4 py-2 rounded w-64 flex flex-row items-center justify-center"
        // style={{ backgroundColor: "purple", color: "white", padding: 10, borderRadius: 5 }}
        onPress={async () => {
          console.log(username, bio);
          try {
            const result = await user.create({
              bio,
              username,
              // picture: {
              //   url: imgUrl || "",
              // },
              picture: {
                url: "https://placehold.it/32x32",
              },
            });
            console.log({ result });
          } catch (error) {
            console.log(error);
          }
        }}>
        <Text className="text-lg text-white font-medium">Submit</Text>
      </Pressable>
    </View>
  );
};

export default ProfilePage;
