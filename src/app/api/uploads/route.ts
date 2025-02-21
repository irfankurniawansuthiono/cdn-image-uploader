import { OctoConvert } from "@/app/utils/uploads";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("file") as File;
    const url = await OctoConvert(image);
    const localUrl =
      "https://cdn.irfanks.site/api/file/" +
      url.toString().split("/")[url.toString().split("/").length - 1];
    console.log("Uploaded to:", localUrl);
    return NextResponse.json({ url: localUrl }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
