import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Layout from "dsnap/components/layout";
import { useAuthGuard } from "dsnap/hooks/useRouterGuard";
import Link from "next/link";

const FeedPage = () => {
  useAuthGuard({ isPrivate: true });

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <ScrollArea className="h-full">
          <div className="grid gap-4">
            <Card className="rounded-none shadow-none border-0">
              <CardHeader className="p-4 flex flex-row items-center">
                <Link className="flex items-center gap-2 text-sm font-semibold" href="#">
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage alt="@user1" src="/placeholder-user.jpg" />
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  User1
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <img alt="Image" className="aspect-square object-cover" src="https://placehold.it/500x500" />
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
            <Card className="rounded-none shadow-none border-0">
              <CardHeader className="p-4 flex flex-row items-center">
                <Link className="flex items-center gap-2 text-sm font-semibold" href="#">
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage alt="@user2" src="/placeholder-user.jpg" />
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  User2
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <img alt="Image" className="aspect-square object-cover" src="https://placehold.it/500x500" />
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
