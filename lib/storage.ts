import { promises as fs } from 'fs';
import path from 'path';

const storageRoot = path.join(process.cwd(), 'storage');
const tempDir = path.join(storageRoot, 'temp');
const uploadsDir = path.join(storageRoot, 'uploads');
const statePath = path.join(tempDir, 'state.json');

const allowedMimeTypes = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]);

export type ProcessingState = Record<string, { status: 'processing' | 'completed' | 'failed'; path: string }>;

async function ensureStorageDirs(): Promise<void> {
  await Promise.all([
    fs.mkdir(tempDir, { recursive: true }),
    fs.mkdir(uploadsDir, { recursive: true })
  ]);
}

export function validateFile(file: File): void {
  const maxSize = 10 * 1024 * 1024;
  if (!allowedMimeTypes.has(file.type)) {
    throw new Error('Unsupported file type');
  }
  if (file.size > maxSize) {
    throw new Error('File too large');
  }
}

export function generateUniqueName(originalName: string): string {
  const safeBase = originalName.replace(/[^a-zA-Z0-9_.-]/g, '_');
  return `${Date.now()}-${crypto.randomUUID()}-${safeBase}`;
}

export async function uploadFile(file: File): Promise<string> {
  await ensureStorageDirs();
  const tempName = generateUniqueName(file.name);
  const tempPath = path.join(tempDir, tempName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(tempPath, buffer);
  return tempPath;
}

export async function moveToPermanent(tempPathValue: string): Promise<string> {
  await ensureStorageDirs();
  const fileName = path.basename(tempPathValue);
  const targetPath = path.join(uploadsDir, fileName);
  await fs.rename(tempPathValue, targetPath);
  return targetPath;
}

export async function deleteFile(filePath: string): Promise<void> {
  await fs.rm(filePath, { force: true });
}

export async function loadProcessingState(): Promise<ProcessingState> {
  await ensureStorageDirs();
  try {
    const content = await fs.readFile(statePath, 'utf8');
    const parsed = JSON.parse(content) as ProcessingState;
    return parsed;
  } catch {
    return {};
  }
}

export async function saveProcessingState(state: ProcessingState): Promise<void> {
  await ensureStorageDirs();
  await fs.writeFile(statePath, JSON.stringify(state, null, 2), 'utf8');
}
