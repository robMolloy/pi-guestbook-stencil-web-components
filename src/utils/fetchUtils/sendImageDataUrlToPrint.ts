import { z } from 'zod';

export const sendImageDataUrlToPrint = async (p: { imageDataUrl: string }) => {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 3000);
    const resp = await fetch(`${localStorage.getItem('serverBaseUrl')}${localStorage.getItem('serverEndpoint')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: p.imageDataUrl }),
      signal: controller.signal,
    });
    const json = await resp.json();
    if (json.success === true) return { success: true } as const;
    return { success: false, error: 'response invalid' } as const;
  } catch (error) {
    return { success: false, error: error.name } as const;
  }
};

export const sendImageDataUrlsForBackup = async (p: { imageDataUrls: string[] }) => {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 3000);
    const resp = await fetch(`${localStorage.getItem('serverBaseUrl')}${localStorage.getItem('serverBackupImagesEndpoint')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageDataUrls: p.imageDataUrls }),
      signal: controller.signal,
    });
    const json = await resp.json();
    if (json.success === true) return { success: true } as const;
    return { success: false, error: 'response invalid' } as const;
  } catch (error) {
    return { success: false, error: error.name } as const;
  }
};

const delay = async (x: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), x);
  });
};

export const retrieveBackupImageDataUrls = async (k: string) => {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${localStorage.getItem('serverBaseUrl')}get-backup-images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ backupImageDirectory: k }),
      signal: controller.signal,
    });
    const json = await response.json();
    return z.array(z.string()).safeParse(json);
  } catch (e) {
    return { success: false } as const;
  }
};

export const retrieveBackupImageList = async () => {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${localStorage.getItem('serverBaseUrl')}get-backup-images-list`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
    });
    const json = await response.json();
    return z.array(z.string()).safeParse(json);
  } catch (e) {
    return { success: false } as const;
  }
};
