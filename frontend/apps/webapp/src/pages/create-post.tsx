import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ActorMap } from "icp-connect-core/client";
import { useActor } from "icp-connect-react/hooks";

import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useAuthGuard } from "@/hooks/useRouterGuard";
import { storage } from "@/lib/firebase";

import { Canisters } from "../canisters";

const CreatePostPage = () => {
  useAuthGuard({ isPrivate: true });
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleUploadPostImage = (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `dsnap-web/post/${file.name}`);
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

  const user = useActor<Canisters>("user") as ActorMap<Canisters>["user"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Layout>
      <ScrollArea className="h-full">
        <Card className="w-full max-w-sm overflow-hidden min-w-[500px] h-screen">
          <CardHeader className="p-4 flex items-center">
            <Link className="flex items-center gap-2 text-sm font-semibold" href="#">
              <Avatar className="w-8 h-8 border">
                <AvatarImage alt="User avatar" src="/placeholder-user.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              Upload Image
            </Link>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={handleUploadPostImage} className="form">
              {!imgUrl && (
                <div className="outerbar">
                  <div className="innerbar" style={{ width: `${progressPercent}%` }}>
                    {progressPercent}%
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {imgUrl && (
                  <img
                    className="my-2 m-auto"
                    height="400"
                    width="400"
                    src={imgUrl}
                    alt="uploaded post"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                  />
                )}
                {!imgUrl && (
                  <img
                    alt="Placeholder for upload"
                    className="w-full object-cover mb-4"
                    height="400"
                    width="400"
                    src="https://placehold.it/400x400"
                    style={{
                      aspectRatio: "400/400",
                      objectFit: "cover",
                    }}
                  />
                )}
                <Label htmlFor="profile-picture">Select image to upload</Label>
                <Input accept="image/*" className="block mt-1 w-full" id="profile-picture" type="file" />
                <Button type="submit" className="mt-1 ml-auto bg-purple-600">
                  Upload Image
                </Button>
              </div>
            </form>
            <form name="create-post">
              <div className="mt-4 grid w-full gap-1.5">
                <Label htmlFor="image-description">Add a description</Label>
                <Textarea
                  id="image-description"
                  placeholder="Describe your image here..."
                  {...register("description")}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add a compelling description to capture your audience&apos;s attention.
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="p-2">
            <Button
              disabled={loading}
              onClick={handleSubmit(async (data) => {
                setLoading(true);
                if (imgUrl === null) return;
                try {
                  const result = await user.createPost({
                    images: [{ url: imgUrl }],
                    description: data.description,
                  });
                  console.log({ result });
                } catch (error) {
                  console.log(error);
                }
                setLoading(false);
              })}
              className="w-full bg-purple-600 text-white rounded">
              Create Post
            </Button>
          </CardFooter>
        </Card>
      </ScrollArea>
    </Layout>
  );
};

export default CreatePostPage;
