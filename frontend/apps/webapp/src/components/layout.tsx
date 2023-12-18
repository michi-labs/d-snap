import { Button } from "@/components/ui/button";
import { AuthContext } from "dsnap/lib/auth/auth-context";
import Link from "next/link";
import { ReactNode, useContext } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { profile } = useContext(AuthContext);
  return (
    <div className="w-[500px] h-screen relative mx-auto">
      <main>{children}</main>
      <div className="max-width-[500px] absolute bottom-0">
        <div className="flex items-center justify-between bg-white p-4 border-t border-gray-300 min-w-[500px] mx-auto">
          <Link href="/feed">
            <Button size="icon" variant="ghost">
              <HomeIcon className="w-6 h-6 text-gray-500" />
              <span className="sr-only">Home</span>
            </Button>
          </Link>
          {/* <Link href="/inbox">
            <Button size="icon" variant="ghost">
              <InboxIcon className="w-6 h-6 text-gray-500" />
              <span className="sr-only">Inbox</span>
            </Button>
          </Link> */}
          <Link href="/create-post">
            <Button size="icon" variant="ghost">
              <PlusIcon className="w-6 h-6 text-gray-500" />
              <span className="sr-only">Add new</span>
            </Button>
          </Link>
          {/* <Link href="/friend-list">
            <Button size="icon" variant="ghost">
              <FriendListIcon className="w-6 h-6 text-gray-500" />
              <span className="sr-only">Friends</span>
            </Button>
          </Link> */}
          <Link href="/profile">
            <Button size="icon" variant="ghost">
              <img
                alt="Avatar"
                className="rounded-full"
                src={profile && profile.picture?.url ? profile.picture.url : "https://placehold.it/32x32"}
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                height="32"
                width="32"
              />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function HomeIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`lucide lucide-home ` + props.className}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PlusIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`lucide lucide-plus ` + props.className}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function InboxIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`lucide lucide-inbox ` + props.className}>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function FriendListIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`lucide lucide-users ` + props.className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
