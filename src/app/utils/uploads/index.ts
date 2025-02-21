import { Octokit } from "octokit";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import ResponseBE from "../ResponseBE";

const myOctokit = Octokit.plugin(restEndpointMethods);
const octokit = new myOctokit({ auth: process.env.GITHUB_TOKEN });

function generateFileName(originalName: string) {
  const randomString = Math.random().toString(36).substring(2, 12);
  const extension = originalName.split(".").pop();
  return `${randomString}.${extension}`;
}

const fileTypes = [
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/flac",
  "audio/aac",
  "audio/x-ms-wma",
  "audio/webm",
  "video/mp4",
  "video/mpeg",
  "video/webm",
  "video/ogg",
  "video/3gpp",
  "video/3gpp2",
  "video/x-msvideo",
  "video/x-matroska",
  "video/quicktime",
  "video/x-flv",
  "video/x-ms-wmv",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/bmp",
  "image/tiff",
];

export async function OctoConvert(file: File) {
  try {
    if (!fileTypes.includes(file.type)) {
      return ResponseBE(false, "Invalid file type");
    }
    const fileName = generateFileName(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    const content = buffer.toString("base64");

    const filePath = `file/${fileName}`;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: `${process.env.GITHUB_USERNAME}`,
      repo: "public-uploads",
      path: filePath,
      message: `Upload ${fileName} file`,
      content,
      branch: "main",
    });

    console.log("uploaded : ", filePath);
    const githubUrl = `https://raw.githubusercontent.com/${process.env.GITHUB_USERNAME}/public-uploads/main/${filePath}`;

    return githubUrl;
  } catch (error: any) {
    console.error("Upload error:", error);
    return ResponseBE(false, error.message);
  }
}
