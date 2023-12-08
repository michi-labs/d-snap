import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "dsnap/components/layout";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-lg p-4">
          <CardHeader>
            <CardTitle>Profile Customization</CardTitle>
            <CardDescription>Modify your account settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="private-profile">Private profile</Label>
              <div className="flex items-center space-x-4" id="private-profile">
                <Input
                  className="w-4 h-4"
                  id="public"
                  name="profile"
                  type="radio"
                  value="public"
                />
                <Label htmlFor="public">Public</Label>
                <Input
                  className="w-4 h-4"
                  id="private"
                  name="profile"
                  type="radio"
                  value="private"
                />
                <Label htmlFor="private">Private</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-messaging">User Messaging Privacy</Label>
              <div className="flex items-center space-x-4" id="user-messaging">
                <Input
                  className="w-4 h-4"
                  id="everyone"
                  name="messaging"
                  type="radio"
                  value="everyone"
                />
                <Label htmlFor="everyone">Everyone</Label>
                <Input
                  className="w-4 h-4"
                  id="followed"
                  name="messaging"
                  type="radio"
                  value="followed"
                />
                <Label htmlFor="followed">Followed Users Only</Label>
                <Input
                  className="w-4 h-4"
                  id="no-one"
                  name="messaging"
                  type="radio"
                  value="no-one"
                />
                <Label htmlFor="no-one">No One</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Save</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
