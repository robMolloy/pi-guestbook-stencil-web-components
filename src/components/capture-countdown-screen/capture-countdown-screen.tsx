import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';

const isRapid = false;

const delay = async x => {
  return new Promise(resolve => {
    const t = isRapid ? 100 : x;
    setTimeout(() => resolve(true), t);
  });
};

const getImageDataUrlFromVideoElement = (p: { videoElement: HTMLVideoElement }) => {
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

const onCountdown = async (x: number, fn: (i: number | undefined) => void) => {
  const nums = Array(x + 1)
    .fill(undefined)
    .map((_, j) => x - j);
  for (const num of nums) {
    fn(num);
    await delay(1000);
  }
  fn(undefined);
  return;
};
@Component({
  tag: 'capture-countdown-screen',
  styleUrls: ['../../styles/daisyUi.css', './capture-countdown-screen.css'],
  shadow: true,
})
export class CaptureCountdownScreen {
  @Prop() width: number;
  @Prop() height: number;
  @State() countdownInt: number | undefined = undefined;
  @State() videoElement: HTMLVideoElement | undefined = undefined;
  @State() imageDataUrls: string[] | [] = [];
  @State() selectedImageDataUrl: string | undefined = undefined;
  @State() captureSequenceStatus: 'initial' | 'countdown' | 'capturing' | 'selecting' = 'initial';

  @Event()
  clickStartGuestbookCycleButton: EventEmitter;

  @Event()
  startCaptureCountdown: EventEmitter;

  @Element() el: HTMLElement;

  async captureSequence(p: { videoElement: HTMLVideoElement }) {
    const videoElement = p.videoElement;
    this.imageDataUrls[0] = getImageDataUrlFromVideoElement({ videoElement });
    this.imageDataUrls = [...this.imageDataUrls];
    await delay(2000);
    this.imageDataUrls[1] = getImageDataUrlFromVideoElement({ videoElement });
    this.imageDataUrls = [...this.imageDataUrls];
    await delay(2000);
    this.imageDataUrls[2] = getImageDataUrlFromVideoElement({ videoElement });
    this.imageDataUrls = [...this.imageDataUrls];
    await delay(2000);
    this.imageDataUrls[3] = getImageDataUrlFromVideoElement({ videoElement });
    this.imageDataUrls = [...this.imageDataUrls];
    return;
  }

  componentDidLoad() {
    const videoElement = this.el.shadowRoot.querySelector('video');
    // this.videoElement = videoElement;
    videoElement.srcObject = window.streamData;

    (async () => {
      this.captureSequenceStatus = 'countdown';
      await onCountdown(5, (x: number) => (this.countdownInt = x));
      this.captureSequenceStatus = 'capturing';
      await this.captureSequence({ videoElement });
      this.captureSequenceStatus = 'selecting';
    })();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {this.captureSequenceStatus !== 'selecting' && <global-h1>Strike a pose!</global-h1>}
        {this.captureSequenceStatus === 'selecting' && (
          <div>
            <global-h1>Select the photo you want to print</global-h1>
            <global-h2>If you don't like any, just tap "Start again"</global-h2>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: '37vh', width: `${(37 * 6) / 4}vh`, position: 'relative' }}>
            {this.captureSequenceStatus === 'selecting' && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#eee',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '2rem',
                  backgroundImage: `url('${this.selectedImageDataUrl}')`,
                  backgroundSize: 'cover',
                  backgroundposition: 'center',
                }}
              >
                {this.selectedImageDataUrl === undefined && <global-h2>Select your favourite image</global-h2>}
              </div>
            )}
            {this.captureSequenceStatus !== 'selecting' && (
              <div style={{ width: '100%', height: '100%' }}>
                {this.countdownInt !== undefined && <div class="countdownIntCircle">{this.countdownInt}</div>}
                <video style={{ transform: 'scaleX(-1)', width: '100%', height: '100%' }} width={this.width} height={this.height} autoplay></video>
              </div>
            )}
          </div>
        </div>

        <br />

        {this.captureSequenceStatus === 'selecting' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button class="btn btn-primary" disabled={this.selectedImageDataUrl === undefined}>
              Print photo
            </button>
            <button class="btn btn-accent" onClick={() => this.clickStartGuestbookCycleButton.emit()}>
              Start again
            </button>
          </div>
        )}

        <br />

        <div class="capture-canvases">
          {[0, 1, 2, 3].map(x => {
            return (
              <span
                class="capture-canvas"
                style={{ backgroundImage: `url('${this.imageDataUrls?.[x]}')` }}
                onClick={() => {
                  if (this.captureSequenceStatus !== 'selecting') return;
                  this.selectedImageDataUrl = this.imageDataUrls?.[x];
                  console.log({ a: this.selectedImageDataUrl, len: this.selectedImageDataUrl.length });
                }}
              >
                <span class="captured-image-number"> {x + 1} </span>
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}
