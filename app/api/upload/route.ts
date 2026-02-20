import { NextResponse } from 'next/server';
import {
  deleteFile,
  loadProcessingState,
  moveToPermanent,
  saveProcessingState,
  uploadFile,
  validateFile
} from '@/lib/storage';

export async function POST(request: Request): Promise<NextResponse> {
  const form = await request.formData();
  const file = form.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ message: 'File is required' }, { status: 400 });
  }

  let tempPath = '';

  try {
    validateFile(file);
    tempPath = await uploadFile(file);

    const state = await loadProcessingState();
    state[file.name] = { status: 'processing', path: tempPath };
    await saveProcessingState(state);

    const permanentPath = await moveToPermanent(tempPath);
    const latestState = await loadProcessingState();
    latestState[file.name] = { status: 'completed', path: permanentPath };
    await saveProcessingState(latestState);

    return NextResponse.json({ path: permanentPath });
  } catch (error) {
    if (tempPath) {
      await deleteFile(tempPath);
    }
    const state = await loadProcessingState();
    if (file instanceof File) {
      state[file.name] = { status: 'failed', path: '' };
      await saveProcessingState(state);
    }
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Upload failed' }, { status: 400 });
  }
}
