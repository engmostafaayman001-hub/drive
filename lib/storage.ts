import { mkdir, rename, rm, stat, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const rootDir = process.cwd();
const storageDir = path.join(rootDir, "storage");
const tempDir = path.join(storageDir, "temp");
const uploadDir = path.join(storageDir, "uploads");
const stateFile = path.join(tempDir, "state.json");

const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
]);

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export type ProcessingState = {
  tempPath: string;
  finalName: string;
  status: "pending" | "processing" | "failed" | "completed";
  updatedAt: string;
};

async function ensureDirs(): Promise<void> {
  await mkdir(tempDir, { recursive: true });
  await mkdir(uploadDir, { recursive: true });
}

export function validateFile(mimeType: string, size: number): void {
  if (!ALLOWED_MIME.has(mimeType)) {
    throw new Error("Unsupported file type");
  }
  if (size > MAX_SIZE_BYTES) {
    throw new Error("File exceeds allowed size");
  }
}

export function generateUniqueName(originalName: string): string {
  const ext = path.extname(originalName);
  return `${Date.now()}-${randomUUID()}${ext}`;
}

export async function uploadFile(file: File): Promise<{ tempPath: string; fileName: string }> {
  await ensureDirs();
  validateFile(file.type, file.size);

  const fileName = generateUniqueName(file.name);
  const tempPath = path.join(tempDir, fileName);
  const arrayBuffer = await file.arrayBuffer();
  await writeFile(tempPath, Buffer.from(arrayBuffer));

  return { tempPath, fileName };
}

export async function moveToPermanent(tempPath: string, finalName: string): Promise<string> {
  await ensureDirs();
  const destination = path.join(uploadDir, finalName);
  await rename(tempPath, destination);
  return destination;
}

export async function deleteFile(filePath: string): Promise<void> {
  await rm(filePath, { force: true });
}

export async function saveProcessingState(state: ProcessingState): Promise<void> {
  await ensureDirs();
  await writeFile(stateFile, JSON.stringify(state, null, 2), "utf-8");
}

export async function loadProcessingState(): Promise<ProcessingState | null> {
  try {
    const content = await readFile(stateFile, "utf-8");
    const parsed = JSON.parse(content) as ProcessingState;
    await stat(parsed.tempPath);
    return parsed;
  } catch {
    return null;
  }
}

export async function clearProcessingState(): Promise<void> {
  await deleteFile(stateFile);
}
