import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Button, Image, Pressable, Text, TextInput, View } from "react-native";

import { ActorMap } from "icp-connect-core";
import { useActor } from "icp-connect-react/hooks";

import { CanisterTypes } from "../../src/lib/canisters";
import { storage } from "../../src/lib/firebase";

const CreatePostPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageRemoteUri, setImageRemoteUri] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const user = useActor<CanisterTypes>("user") as ActorMap<CanisterTypes>["user"];

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log({ result });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.table(result.assets);
      // Upload to firebase
      const storageRef = ref(storage, `dsnap-web/post/${result.assets[0].fileName || "demo"}`);
      const uploadTask = uploadBytesResumable(storageRef, result.assets[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // setProgressPercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageRemoteUri(downloadURL);
          });
        }
      );
    }
  };

  return (
    <View className="flex flex-1 w-full h-full bg-blue-500">
      <Text>Create Post Page</Text>
      <Button
        title="Submit2222222"
        onPress={() => {
          console.log("submit");
        }}
      />
      <Text className="text-white">{JSON.stringify(imageRemoteUri)}aaa</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <TextInput
          placeholder="Write something for your picture"
          placeholderTextColor={"white"}
          multiline={true}
          className="text-white mt-8 border-gray-600 rounded-md p-5"
          onChangeText={(value) => {
            setDescription(value);
          }}
        />

        <Pressable
          className="bg-purple-600 text-white px-4 py-2 rounded w-64 flex flex-row items-center justify-center"
          onPress={async () => {
            console.log("submit");
            try {
              const result = await user.createPost({
                images: [{ url: imageRemoteUri || "" }],
                description: description || "",
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

export default CreatePostPage;
