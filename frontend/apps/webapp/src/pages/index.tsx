import { Button } from "../components/ui/button";
import { AuthButton } from "../lib/auth/auth-button";
import { AuthContext } from "../lib/auth/auth-context";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function HomePage() {
  const { isAuthenticated, profile } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (profile) {
        // Go to feed
        router.push("/feed");
      } else {
        // Go to profile
        router.push("/profile");
      }
    }
  }, [isAuthenticated, profile]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-md py-10 px-8 bg-white shadow-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-3xl font-bold text-gray-900">Welcome to DSnap</CardTitle>
          <CardDescription className="text-center text-lg text-gray-700 flex flex-col">
            {isAuthenticated ? "Welcome back!" : "Sign in with your ICP identity to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-10">
          {isAuthenticated && (
            <Link href="/feed">
              <Button className="w-full my-4">Home</Button>
            </Link>
          )}
          <AuthButton />
        </CardContent>
      </Card>
    </div>
  );
}
