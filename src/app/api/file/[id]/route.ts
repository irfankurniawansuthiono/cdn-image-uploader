// src/app/api/file/[id]/route.ts
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return Response.json({ message: "Invalid file id" }, { status: 400 });
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

    // Create response with proper headers
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return Response.json({ message: "File not found" }, { status: 404 });
  }
}
