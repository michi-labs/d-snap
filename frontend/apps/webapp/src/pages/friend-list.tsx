import Link from "next/link";

import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthGuard } from "@/hooks/useRouterGuard";

const FriendListPage = () => {
  useAuthGuard({ isPrivate: true });

  return (
    <Layout>
      <div className="mx-auto max-w-[500px] space-y-6 p-6 h-full">
        <div className="space-y-2 text-left">
          <h1 className="text-2xl font-bold">My Friends</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Connect with your friends on our platform
          </p>
        </div>
        <ScrollArea>
          <Card className="rounded-none shadow-none border-0">
            <CardHeader className="p-4 flex flex-row items-center justify-between">
              <div className="flex items-center">
                <Avatar className="w-8 h-8 border mr-3">
                  <AvatarImage alt="@johndoe" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Link className="text-sm font-semibold" href="#">
                  John Doe
                </Link>
              </div>
              <Button className="ml-3" variant="outline">
                Follow
              </Button>
            </CardHeader>
          </Card>
          <Card className="rounded-none shadow-none border-0">
            <CardHeader className="p-4 flex flex-row items-center justify-between">
              <div className="flex items-center">
                <Avatar className="w-8 h-8 border mr-3">
                  <AvatarImage alt="@janedoe" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Link className="text-sm font-semibold" href="#">
                  Jane Doe
                </Link>
              </div>
              <Button className="ml-3" variant="outline">
                Follow
              </Button>
            </CardHeader>
          </Card>
          <Card className="rounded-none shadow-none border-0">
            <CardHeader className="p-4 flex flex-row items-center justify-between">
              <div className="flex items-center">
                <Avatar className="w-8 h-8 border mr-3">
                  <AvatarImage alt="@robertdoe" src="/placeholder-user.jpg" />
                  <AvatarFallback>RD</AvatarFallback>
                </Avatar>
                <Link className="text-sm font-semibold" href="#">
                  Robert Doe
                </Link>
              </div>
              <Button className="ml-3" variant="outline">
                Follow
              </Button>
            </CardHeader>
          </Card>
          <Card className="rounded-none shadow-none border-0">
            <CardHeader className="p-4 flex flex-row items-center justify-between">
              <div className="flex items-center">
                <Avatar className="w-8 h-8 border mr-3">
                  <AvatarImage alt="@emilydoe" src="/placeholder-user.jpg" />
                  <AvatarFallback>ED</AvatarFallback>
                </Avatar>
                <Link className="text-sm font-semibold" href="#">
                  Emily Doe
                </Link>
              </div>
              <Button className="ml-3" variant="outline">
                Follow
              </Button>
            </CardHeader>
          </Card>
        </ScrollArea>
      </div>
    </Layout>
  );
};

export default FriendListPage;
