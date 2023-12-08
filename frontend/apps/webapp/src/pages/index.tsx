import { useContext } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import { AuthButton } from "../lib/auth/auth-button";
import { AuthContext } from "../lib/auth/auth-context";
import { useActor } from "../packages/icp/hooks/useActor";

export default function HomePage() {
  const { isAuth } = useContext(AuthContext);
  const user = useActor("user");

  async function create() {
    try {
      // @ts-ignore
      const response = await user.create({
        username: "adrian_hidalgo",
        bio: "Software developer",
        picture: {
          url: "https://www.google.com",
        },
      });

      console.log({ response });
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
