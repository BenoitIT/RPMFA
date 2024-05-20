import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ success: false, message: "Invalid file" });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const path = `./public/documents/${file.name}`;

  try {
    await writeFile(path, buffer);
    return NextResponse.json({
      success: true,
      status: 200,
      message: "Document is uploaded successfully",
      imgUrl: path.replace("./public", ""),
    });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Error uploading document",
    });
  }
}
