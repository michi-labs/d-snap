import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import z from "zod";

import { ActorMap } from "icp-connect-core/client";
import { useActor } from "icp-connect-react/hooks";

import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthGuard } from "@/hooks/useRouterGuard";
import { AuthContext } from "@/lib/auth/auth-context";

import { Canisters } from "../canisters";

type NestedArray = Array<[string, { id: string; images: { url: string }[]; description: string }]>;

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

const FeedPage = () => {
  useAuthGuard({ isPrivate: true });
  const { profile } = useContext(AuthContext);
  const user = useActor<Canisters>("user") as ActorMap<Canisters>["user"];
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
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <ScrollArea className="h-full">
          <div className="grid gap-4">
            {feed.length === 0 && (
              <div className="flex items-center justify-center h-full mt-11">
                <div className="flex flex-col items-center justify-center gap-4">
                  <p className="text-lg font-semibold">No posts yet</p>
                  <p className="text-sm text-gray-500">When you post, they&apos;ll show up here.</p>
                </div>
              </div>
            )}
            {feed.map((wrapper) => {
              const [_id, item] = wrapper;
              return (
                <Card key={item.id} className="rounded-none shadow-none border-0">
                  <CardHeader className="p-4 flex flex-row items-center">
                    <Link className="flex items-center gap-2 text-sm font-semibold" href="#">
                      <Avatar className="w-8 h-8 border">
                        <AvatarImage
                          alt="@user1"
                          src={profile?.picture?.url ? profile.picture.url : "https://placehold.it/50x50"}
                        />
                        <AvatarFallback>{profile?.username || "User"}</AvatarFallback>
                      </Avatar>
                      {profile?.username || "User"}
                    </Link>
                  </CardHeader>
                  <CardContent className="p-0">
                    <img
                      alt="Image"
                      className="aspect-square object-cover"
                      src={
                        item.images && item.images[0] ? item.images[0]?.url : "https://placehold.it/500x500"
                      }
                    />
                    {/* put a description */}
                    <p className="p-4">{item.description}</p>
                  </CardContent>
                  <CardFooter className="p-2 pb-4 grid gap-2">
                    <div className="flex items-center w-full">
                      <Button size="icon" variant="ghost">
                        <HeartIcon className="w-4 h-4" />
                        <span className="sr-only">Like</span>
                      </Button>
                      <Button size="icon" variant="ghost">
                        <MessageCircleIcon className="w-4 h-4" />
                        <span className="sr-only">Comment</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </Layout>
  );
};

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}

export default FeedPage;
