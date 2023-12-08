import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Layout from "dsnap/components/layout";
import { useState } from "react";
import { storage } from "@/lib/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Input } from "dsnap/components/ui/input";
import { ScrollArea } from "dsnap/components/ui/scroll-area";

const CreatePostPage = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `dsnap-web/post/${file.name}`);
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
      <ScrollArea className="h-full">
        <Card className="w-full max-w-sm overflow-hidden min-w-[500px] h-screen">
          <CardHeader className="p-4 flex items-center">
            <Link
              className="flex items-center gap-2 text-sm font-semibold"
              href="#"
            >
              <Avatar className="w-8 h-8 border">
                <AvatarImage alt="User avatar" src="/placeholder-user.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              Upload Image
            </Link>
          </CardHeader>
          <CardContent className="p-4">
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
                <Input
                  accept="image/*"
                  className="block mt-1 w-full"
                  id="profile-picture"
                  type="file"
                />
                <Button type="submit" className="mt-1 ml-auto bg-purple-600">
                  Upload Image
                </Button>
              </div>
            </form>

            <div className="mt-4 grid w-full gap-1.5">
              <Label htmlFor="image-description">Add a description</Label>
              <Textarea
                id="image-description"
                placeholder="Describe your image here..."
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add a compelling description to capture your audience's
                attention.
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-2">
            <Button className="w-full bg-purple-600 text-white rounded">
              Upload
            </Button>
          </CardFooter>
        </Card>
      </ScrollArea>
    </Layout>
  );
};

export default CreatePostPage;
