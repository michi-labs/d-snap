import { useContext, useEffect, useState } from "react";

import { useActor } from "../packages/icp/hooks/useActor";
import { AuthButton } from "../lib/auth/auth-button";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { useAuth } from "dsnap/packages/icp/hooks/useAuth";
import { AuthContext } from "dsnap/lib/auth/auth-context";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const { isAuth } = useContext(AuthContext);

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
            {isAuth
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
