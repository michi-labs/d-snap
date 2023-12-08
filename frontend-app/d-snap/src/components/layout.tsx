import { Button } from "@/components/ui/button";

import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-width-[500px] h-screen relative">
      <main>{children}</main>
      <div className="max-width-[500px] absolute bottom-0">
        <div className="flex items-center justify-between bg-white p-4 border-t border-gray-300 min-w-[500px] mx-auto">
          <Button size="icon" variant="ghost">
            <HomeIcon className="w-6 h-6 text-gray-500" />
            <span className="sr-only">Home</span>
          </Button>
          <Button size="icon" variant="ghost">
            <SearchIcon className="w-6 h-6 text-gray-500" />
            <span className="sr-only">Search</span>
          </Button>
          <Button size="icon" variant="ghost">
            <PlusIcon className="w-6 h-6 text-gray-500" />
            <span className="sr-only">Add new</span>
          </Button>
          <Button size="icon" variant="ghost">
            <Link href="#">
              <img
                alt="Avatar"
                className="rounded-full"
                height
                x="32"
                src="https://placehold.it/32x32"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function HomeIcon(props) {
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
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PlusIcon(props) {
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
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props) {
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
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
