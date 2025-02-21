import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!id) {
    return new Response(JSON.stringify({ message: "Invalid file id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const url = `https://raw.githubusercontent.com/${process.env.GITHUB_USERNAME}/public-uploads/main/file/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return new Response(JSON.stringify({ message: "File not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
