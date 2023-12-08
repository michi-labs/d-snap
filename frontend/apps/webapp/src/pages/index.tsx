import { useEffect, useState } from "react";

import { useActor } from "../packages/icp/hooks/useActor";
import { AuthButton } from "../components/auth/auth-button";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "dsnap/packages/icp/hooks/useAuth";

export default function HomePage() {
  const [greet, setGreet] = useState("");
  const [username, setUsername] = useState("");
  const test = useActor("test");
  const auth = useAuth();
  const [authState, setAuthState] = useState<boolean>(false);

  useEffect(() => {
    getGreet();
    getAuthState();
  }, []);

  async function getAuthState() {
    const authState = await auth.isAuthenticated();
    setAuthState(authState);
  }

  async function getGreet() {
    // @ts-ignore
    const greet = await test.greet("Adrian");
    setGreet(greet);
  }

  async function create() {
    try {
      // @ts-ignore
      await user.create({
        username: "adrian_hidalgo",
        bio: "Software developer",
        picture: {
          url: "https://www.google.com",
        },
      });

      // @ts-ignore
      const profile = await user.getProfile();
      console.log({ profile });

      setUsername(profile.username);
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-md py-10 px-8 bg-white shadow-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-3xl font-bold text-gray-900">
            Welcome to DSnap
          </CardTitle>
          <CardDescription className="text-center text-lg text-gray-700">
            {authState
              ? "Welcome back!"
              : "Sign in with your ICP identity to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-10">
          <AuthButton />
        </CardContent>
      </Card>
    </div>
  );
}
