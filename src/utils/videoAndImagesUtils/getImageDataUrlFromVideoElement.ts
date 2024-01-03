export const getImageDataUrlFromVideoElement = (p: { videoElement: HTMLVideoElement }) => {
  const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
  canvas.width = p.videoElement.width;
  canvas.height = p.videoElement.height;

  const ctx = canvas.getContext('2d');
  ctx.scale(-1, 1);
  ctx.drawImage(p.videoElement, -p.videoElement.width, 0, p.videoElement.width, p.videoElement.height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  const imageDataUrl = canvas.toDataURL('image/png');
  canvas.remove();
  return imageDataUrl;
};
