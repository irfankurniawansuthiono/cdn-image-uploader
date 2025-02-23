"use client";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Loader, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("file", image);
    }
    const res = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!data.url) {
      return setResponse(data.error);
    }
    setLoading(false)
    setResponse(data.url);
  };

  return (
    <main className="flex flex-col gap-5 md:gap-0 my-10 md:my-0 md:flex-row justify-around min-h-screen items-center px-4">
      {/* Link ke Website */}
      <div className="flex flex-col gap-4 items-center w-[90svw] md:w-1/2 h-96 md:h-96">
      <iframe src={"https://irfanks.site"} className="w-full h-full" />
      <Link href={"https://irfanks.site"}>
        <Button variant={"destructive"} className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Go to my website
        </Button>
      </Link>
      </div>

      {/* Card Form Upload */}
      <Card className="w-full max-w-md p-2 shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Upload your file</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* File Upload Component */}
            <FileUpload
              acceptedFileTypes={{
                images: ["image/*"],
              }}
              onFilesUploaded={(files) => setImage(Array.isArray(files) ? files[0] : files)}
            />

            {/* Submit Button */}
            <Button type="submit" disabled={loading} className="w-full flex items-center gap-2">
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {loading ? "Uploading..." : "Upload"}
            </Button>

            {/* Response Message */}
            {response && (
              <p className="text-center text-sm text-gray-600 bg-gray-100 p-2 rounded-md">
                {response}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
