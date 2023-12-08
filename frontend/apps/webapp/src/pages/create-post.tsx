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

const CreatePostPage = () => {
  return (
    <Layout>
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
          <img
            alt="Placeholder for upload"
            className="w-full object-cover mb-4"
            height="400"
            src="https://placehold.it/400x400"
            style={{
              aspectRatio: "400/400",
              objectFit: "cover",
            }}
            width="400"
          />
          <div className="grid w-full gap-1.5">
            <Label htmlFor="image-description">Add a description</Label>
            <Textarea
              id="image-description"
              placeholder="Describe your image here..."
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add a compelling description to capture your audience's attention.
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <Button className="w-full bg-purple-600 text-white rounded">
            Upload
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  );
};

export default CreatePostPage;
