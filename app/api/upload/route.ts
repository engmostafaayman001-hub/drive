import { NextRequest, NextResponse } from "next/server";
import { getRequestToken, verifyToken } from "@/lib/auth";
import {
  clearProcessingState,
  deleteFile,
  loadProcessingState,
  moveToPermanent,
  saveProcessingState,
  uploadFile
} from "@/lib/storage";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const token = getRequestToken(request);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await verifyToken(token);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existingState = await loadProcessingState();
  if (existingState && existingState.status !== "completed") {
    try {
      const destination = await moveToPermanent(existingState.tempPath, existingState.finalName);
      await clearProcessingState();
      return NextResponse.json({ path: destination, resumed: true });
    } catch {
      await deleteFile(existingState.tempPath);
      await clearProcessingState();
    }
  }

  const formData = await request.formData();
  const fileEntry = formData.get("file");

  if (!(fileEntry instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  try {
    const { tempPath, fileName } = await uploadFile(fileEntry);
    await saveProcessingState({
      tempPath,
      finalName: fileName,
      status: "processing",
      updatedAt: new Date().toISOString()
    });

    const destination = await moveToPermanent(tempPath, fileName);
    await saveProcessingState({
      tempPath: destination,
      finalName: fileName,
      status: "completed",
      updatedAt: new Date().toISOString()
    });
    await clearProcessingState();

    return NextResponse.json({ path: destination, resumed: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    const state = await loadProcessingState();
    if (state) {
      await deleteFile(state.tempPath);
      await clearProcessingState();
    }
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
