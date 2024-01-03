import cn from "classnames";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { PlusCircle } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { ActorMap } from "icp-connect-core";
import { useActor } from "icp-connect-react/hooks";

import { Canisters } from "../../src/canisters";
import { storage } from "../../src/lib/firebase";

const CreatePostPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageRemoteUri, setImageRemoteUri] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useActor<Canisters>("user") as ActorMap<Canisters>["user"];

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log({ result });
    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0], "ASSETS");
      // Upload to firebase
      const storageRef = ref(storage, `dsnap-web/post/${uuidv4()}.jpeg`);
      const blob = await fetch(result.assets[0].uri).then((r) => r.blob());
      const uploadTask = uploadBytesResumable(storageRef, blob, {
        contentType: "image/jpeg",
      });

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
    <View className="bg-white h-full w-full flex-1 flex-col items-center">
      <Text>Create Post Page</Text>

      <View className="w-full px-9 h-full justify-center items-center">
        {!image && (
          <Image
            source={{ uri: "https://placehold.it/254x254" }}
            style={{ width: 200, height: 200, marginBottom: 20 }}
            className="rounded-md"
          />
        )}
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginBottom: 20 }}
            className="rounded-md"
          />
        )}
        {image && (
          <Pressable
            className="bg-white w-full px-4 py-2 rounded flex flex-row items-center justify-center border-black border-[1px]"
            onPress={() => {
              setImage(null);
            }}>
            <Text className="text-lg text-black font-medium">Remove image</Text>
          </Pressable>
        )}
        {!image && (
          <Pressable onPress={pickImage}>
            <View className="border-[1px] border-purple-500 px-12 py-4 rounded-md flex flex-row justify-around bg-purple-500">
              <Text className="flex flex-col text-lg font-medium text-white">Pick an image from gallery</Text>
              <Text className="ml-2">
                <PlusCircle className="text-white" size={30} />
              </Text>
            </View>
          </Pressable>
        )}
        <TextInput
          placeholder="Write something for your picture"
          placeholderTextColor={"gray"}
          multiline={true}
          className="text-gray-500 my-8 rounded-md pt-2 pr-5 pb-5 pl-2 border-black border-[1px] h-20 w-full"
          onChangeText={(value) => {
            setDescription(value);
          }}
        />

        <Pressable
          className={cn(
            "bg-purple-600 w-full text-white px-4 py-2 rounded flex flex-row items-center justify-center",
            isLoading && "opacity-50"
          )}
          onPress={async () => {
            setIsLoading(true);
            try {
              const result = await user.createPost({
                images: [{ url: imageRemoteUri || "" }],
                description: description || "",
              });
              console.log({ result });
            } catch (error) {
              console.log(error);
            }
            setIsLoading(false);
          }}>
          <Text className="text-lg text-white font-medium">Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreatePostPage;
