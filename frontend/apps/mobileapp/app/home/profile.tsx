import React, { useContext, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

import { ActorMap } from "icp-connect-core";
import { useActor } from "icp-connect-react/hooks";

import { Canisters } from "../../src/canisters";
import { AuthContext } from "../../src/lib/auth/auth-context";

const ProfilePage = () => {
  const user = useActor<Canisters>("user") as ActorMap<Canisters>["user"];
  const { profile } = useContext(AuthContext);
  const [username, setUsername] = useState(profile?.username || "");
  const [bio, setBio] = useState(profile?.bio || "");

  return (
    <View className="bg-white h-full w-full flex-1 flex-col items-center">
      <Text>Profile Page</Text>

      {/* Image upload */}
      <View className="w-full px-9 h-full justify-center">
        {/* Image view from profile picture */}
        <View className="flex items-center w-full mb-7">
          {profile?.picture?.url && (
            <Image
              source={{ uri: profile?.picture?.url }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          )}
          {!profile?.picture?.url && (
            <Image source={{ uri: "https://placehold.it/64x64" }} style={{ width: 100, height: 100 }} />
          )}
        </View>

        <Text className="text-sm font-medium">Username</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(value) => {
            setUsername(value);
          }}
          className="text-sm mb-4 h-10 w-full rounded border border-gray-300 focus:outline-none focus:border-purple-500 px-4 my-2"
        />
        <Text className="text-sm font-medium">Enter a short description of yourself</Text>
        <TextInput
          placeholder="Bio"
          value={bio}
          onChangeText={(value) => {
            setBio(value);
          }}
          multiline
          className="text-sm h-10 w-full rounded border border-gray-300 focus:outline-none focus:border-purple-500 px-4 my-2"
        />
        <Pressable
          className="bg-purple-600 text-white px-4 py-2 rounded w-full mt-8 flex flex-row items-center justify-center"
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
    </View>
  );
};

export default ProfilePage;
