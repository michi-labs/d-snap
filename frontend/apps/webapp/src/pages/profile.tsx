import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ActorMap } from "icp-connect-core/client";
import { useActor } from "icp-connect-react/hooks";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthGuard } from "@/hooks/useRouterGuard";
import { AuthButton } from "@/lib/auth/auth-button";
import { AuthContext } from "@/lib/auth/auth-context";
import { storage } from "@/lib/firebase";

import { Canisters } from "../canisters";

const ProfilePage = () => {
  useAuthGuard({ isPrivate: true });

  const { profile } = useContext(AuthContext);

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useActor<Canisters>("user") as ActorMap<Canisters>["user"];

  useEffect(() => {
    if (profile?.picture?.url) {
      setImgUrl(profile?.picture?.url);
    }
  }, [profile]);

  const handleSubmitProfilePicture = (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `dsnap-web/profile/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
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
          <CardContent className="my-2">
            <form onSubmit={handleSubmitProfilePicture} className="form">
              {!imgUrl && progressPercent > 0 && (
                <div className="outerbar">
                  <div className="innerbar" style={{ width: `${progressPercent}%` }}>
                    {progressPercent}%
                  </div>
                </div>
              )}

              <div className="">
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
                <Input accept="image/*" className="block mt-1 w-full" id="profile-picture" type="file" />
                <Button type="submit" className="mt-4 ml-auto bg-purple-600">
                  Upload Image
                </Button>
              </div>
            </form>
            <form name="user-profile">
              <div className="space-y-2 mt-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder={"Type your desired username"}
                  value={profile?.username || ""}
                  {...register("username", { required: true })}
                />
              </div>
              <div className="space-y-2 mt-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  placeholder={"Write something about you"}
                  type="text"
                  value={profile?.bio || ""}
                  {...register("bio", { required: true })}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              disabled={loading}
              onClick={handleSubmit(async (data) => {
                setLoading(true);
                try {
                  const result = await user.create({
                    bio: data.bio,
                    username: data.username,
                    picture: {
                      url: imgUrl || "",
                    },
                  });
                  console.log({ result });
                } catch (error) {
                  console.log(error);
                }
                setLoading(false);
              })}
              type="submit"
              form="user-profile"
              className="mt-4 ml-auto bg-purple-600">
              Save
            </Button>

            <div className="flex items-center justify-end w-16 mt-4">
              <AuthButton />
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
