import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Layout from "dsnap/components/layout";
import { useAuthGuard } from "dsnap/hooks/useRouterGuard";

const InboxPage = () => {
  useAuthGuard({ isPrivate: true });

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <div className="min-w-[500px] border h-screen border-y-0 p-4">
          <div className="mb-4 grid grid-cols-[50px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <Avatar className="h-9 w-9">
              <AvatarImage alt="User 1" src="/placeholder-avatar.jpg" />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">User 1</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last message: Hello there! - 5 min ago
              </p>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-[50px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <Avatar className="h-9 w-9">
              <AvatarImage alt="User 2" src="/placeholder-avatar.jpg" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">User 2</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last message: How&apos;s it going? - 10 min ago
              </p>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-[50px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <Avatar className="h-9 w-9">
              <AvatarImage alt="User 3" src="/placeholder-avatar.jpg" />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">User 3</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last message: Good Morning! - 1 hour ago
              </p>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-[50px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <Avatar className="h-9 w-9">
              <AvatarImage alt="User 4" src="/placeholder-avatar.jpg" />
              <AvatarFallback>U4</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">User 4</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last message: See you soon! - 2 hours ago
              </p>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-[50px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <Avatar className="h-9 w-9">
              <AvatarImage alt="User 5" src="/placeholder-avatar.jpg" />
              <AvatarFallback>U5</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">User 5</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last message: Happy Holidays! - 3 hours ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InboxPage;
