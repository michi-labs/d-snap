import { Link } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import z from "zod";

import { ActorMap } from "icp-connect-core";
import { useActor } from "icp-connect-react/hooks";

import { AuthContext } from "../../src/lib/auth/auth-context";
import { CanisterTypes } from "../../src/lib/canisters";

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
  const user = useActor<CanisterTypes>("user") as ActorMap<CanisterTypes>["user"];
  const [feed, setFeed] = useState<NestedArray>([]);

  useEffect(() => {
    async function run() {
      const res = await user.getPosts();
      const parsed = ZResponseSchema.safeParse(res);
      if (parsed.success && parsed.data.ok) {
        setFeed(parsed.data.ok?.data);
      }
    }
    run();
  }, []);
  return (
    <View>
      <Text>Feed Page</Text>
      <ScrollView>
        {feed.length === 0 && (
          <View>
            <Text>No posts yet</Text>
            <Text>When you post, they&apos;ll show up here.</Text>
          </View>
        )}
        {feed.map((post) => {
          const [postId, postContent] = post;
          return (
            <View key={postId}>
              <Text>{JSON.stringify(postContent)}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeedPage;
