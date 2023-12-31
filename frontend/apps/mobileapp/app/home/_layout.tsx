import { Link, Slot } from "expo-router";
import { Home, HomeIcon, PlusIcon } from "lucide-react-native";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native";

import "../../globals.css";

const LayoutHome = () => {
  const profile = {
    picture: {
      url: "https://placehold.it/32x32",
    },
  };

  return (
    <SafeAreaView>
      <View className="h-full flex flex-col items-center justify-center">
        <Slot />
        <View className="absolute items-center bottom-0">
          <View className="w-[88%] h-14 flex flex-row items-center justify-between bg-purple-500 border-t border-gray-300">
            <Pressable>
              <Link replace href="/home/feed" className="">
                <View className="p-2">
                  <HomeIcon className="p-2 w-8 h-8 text-black" />
                </View>
              </Link>
            </Pressable>
            <Pressable>
              <Link replace href="/home/create-post" className="">
                <View className="p-2">
                  <PlusIcon className="p-2 w-8 h-8 text-black" />
                </View>
              </Link>
            </Pressable>
            <Pressable>
              <Link replace href="/home/profile">
                <View className="p-2 flex items-center justify-center">
                  <Image className="w-8 h-8 rounded-full" source={{ uri: profile.picture.url }} />
                </View>
              </Link>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// function HomeIcon(props: { className?: string }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       stroke-width="2"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//       className={`lucide lucide-home ` + props.className}>
//       <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//       <polyline points="9 22 9 12 15 12 15 22" />
//     </svg>
//   );
// }

// function PlusIcon(props: { className?: string }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       stroke-width="2"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//       className={`lucide lucide-plus ` + props.className}>
//       <path d="M5 12h14" />
//       <path d="M12 5v14" />
//     </svg>
//   );
// }

// function InboxIcon(props: { className?: string }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       stroke-width="2"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//       className={`lucide lucide-inbox ` + props.className}>
//       <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
//       <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
//     </svg>
//   );
// }

// function FriendListIcon(props: { className?: string }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       stroke-width="2"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//       className={`lucide lucide-users ` + props.className}>
//       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//     </svg>
//   );
// }

export default LayoutHome;
