import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storage } from "@/lib/firebase";
import Layout from "dsnap/components/layout";
import { CanisterTypes } from "dsnap/declarations";
import { AuthContext } from "dsnap/lib/auth/auth-context";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ActorMap } from "icp-connect-core/client";
import { useActor } from "icp-connect-react/hooks";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const { profile } = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useActor<CanisterTypes>("user") as ActorMap<CanisterTypes>["user"];

  useEffect(() => {
    console.log(profile);
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
                  placeholder={profile?.username}
                  {...register("username", { required: true, value: profile?.username || null })}
                />
              </div>
              <div className="space-y-2 mt-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  placeholder={profile?.bio}
                  type="text"
                  {...register("bio", { required: true, value: profile?.bio || null })}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubmit(async (data) => {
                console.log(data);
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
              })}
              type="submit"
              form="user-profile"
              className="mt-4 ml-auto bg-purple-600">
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
