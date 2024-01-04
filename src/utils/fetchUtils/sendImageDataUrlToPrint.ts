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

export const retrieveBackupImageDataUrls = async () => {
  console.log('images');
};
export const retrieveBackupImageListUrls = async () => {
  console.log('list');
};
