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
import { useContext, useState } from "react";
import { storage } from "@/lib/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "dsnap/lib/auth/auth-context";

const ProfilePage = () => {
  const { profile } = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `dsnap-web/profile/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-lg p-4">
          <CardHeader>
            <CardTitle>Profile Customization</CardTitle>
            <CardDescription>Modify your account settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="form">
              {!imgUrl && (
                <div className="outerbar">
                  <div
                    className="innerbar"
                    style={{ width: `${progressPercent}%` }}
                  >
                    {progressPercent}%
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {imgUrl && (
                  <img
                    className="my-2 rounded-full m-auto"
                    height="100"
                    width="100"
                    src={imgUrl}
                    alt="uploaded avatar"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                  />
                )}
                {!imgUrl && (
                  <img
                    alt="uploaded avatar"
                    className="my-2 rounded-full m-auto"
                    height="100"
                    width="100"
                    src="https://placehold.it/100x100"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                  />
                )}
                <Label htmlFor="profile-picture">Profile Picture</Label>
                <Input
                  accept="image/*"
                  className="block mt-1 w-full"
                  id="profile-picture"
                  type="file"
                />
                <Button type="submit" className="ml-auto bg-purple-600">
                  Upload Image
                </Button>
              </div>
            </form>
            <div className="space-y-2">
              <Label htmlFor="username"></Label>
              <Input id="username" placeholder={profile?.username} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" placeholder={profile?.bio} type="text" />
            </div>
            {/* <div className="space-y-2">
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
            </div> */}
          </CardContent>
          <CardFooter>
            <Button className="ml-auto bg-purple-600">Save</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
