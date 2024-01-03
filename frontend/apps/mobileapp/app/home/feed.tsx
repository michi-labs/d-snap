import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import z from "zod";

import { ActorMap } from "icp-connect-core";
import { useActor } from "icp-connect-react/hooks";

import { Canisters } from "../../src/canisters";
import { AuthContext } from "../../src/lib/auth/auth-context";

const ZResponseSchema = z.object({
  ok: z.object({
    data: z.array(
      z.tuple([
        z.string(),
        z.object({
          id: z.string(),
          images: z.array(z.object({ url: z.string() })),
          description: z.string(),
        }),
      ])
    ),
  }),
});
type NestedArray = Array<[string, { id: string; images: { url: string }[]; description: string }]>;

const FeedPage = () => {
  const { profile } = useContext(AuthContext);
  const user = useActor<Canisters>("user") as ActorMap<Canisters>["user"];
  const [feed, setFeed] = useState<NestedArray>([]);

  useEffect(() => {
    async function run() {
      try {
        const res = await user.getPosts();

        const parsed = ZResponseSchema.safeParse(res);
        if (parsed.success && parsed.data.ok) {
          setFeed(parsed.data.ok?.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    run();
  }, []);
  return (
    <View className="bg-white h-full w-full flex-1 flex-col items-center">
      <Text>Feed Page</Text>
      <ScrollView
        className="w-full px-9 h-full"
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}>
        {feed.length === 0 && (
          <View className="flex w-full items-center">
            <Text className="mb-4">No posts yet</Text>
            <Text>When you post, they&apos;ll show up here.</Text>
          </View>
        )}
        {feed.map((post) => {
          const [postId, postContent] = post;
          return (
            <View key={postId}>
              <Image
                source={{ uri: postContent.images[0].url || "https://placehold.it/254x254" }}
                style={{ width: 200, height: 200, marginBottom: 20 }}
                className="rounded-md"
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeedPage;
