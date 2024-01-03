import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';

const isRapid = false;

const delay = async x => {
  return new Promise(resolve => {
    const t = isRapid ? 100 : x;
    setTimeout(() => resolve(true), t);
  });
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
  @State() imageDataUrl: string | undefined = undefined;
  @Event()
  startCaptureCountdown: EventEmitter;

  @Element() el: HTMLElement;

  async countdown(x: number) {
    const nums = Array(x + 1)
      .fill(undefined)
      .map((_, j) => x - j);
    for (const num of nums) {
      this.countdownInt = num;
      await delay(1000);
    }
    this.countdownInt = undefined;
    return;
  }

  async captureSequence() {
    const nums = Array(4 + 1)
      .fill(undefined)
      .map((_, j) => 4 - j);

    for (const num of nums) {
      this.countdownInt = num;
      await delay(1000);
    }
  }

  componentWillLoad() {
    console.log('will');
  }
  componentDidLoad() {
    console.log('did');
    const videoElement = this.el.shadowRoot.querySelector('video');
    // this.videoElement = videoElement;
    videoElement.srcObject = window.streamData;

    (async () => {
      await onCountdown(1, (x: number) => (this.countdownInt = x));
      const video = videoElement;
      const canvas = this.el.shadowRoot.querySelector('canvas') as unknown as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      ctx.scale(-1, 1);

      /**
       */

      // Draw the current frame of the video on the canvas
      ctx.drawImage(video, -this.width, 0, this.width, this.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // Get the data URL of the canvas
      var imageDataUrl = canvas.toDataURL('image/png');

      // Log or use the dataURL as needed
      console.log('Data URL:', imageDataUrl);

      const captureCanvas = this.el.shadowRoot.querySelector('.capture-canvas') as unknown as HTMLSpanElement;
      captureCanvas.style.backgroundImage = `url('${imageDataUrl}')`;
      this.imageDataUrl = imageDataUrl;
    })();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} onClick={() => this.startCaptureCountdown.emit()}>
        <global-h1>Strike a pose!</global-h1>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: '37vh', position: 'relative' }}>
            {this.countdownInt !== undefined && <div class="countdownIntCircle">{this.countdownInt}</div>}
            <video style={{ transform: 'scaleX(-1)', width: '100%', height: '100%' }} width={this.width} height={this.height} autoplay></video>
          </div>
        </div>

        <br />
        <canvas width={this.width} height={this.height} style={{ display: 'none' }} />

        <section id="captured-images-section" style={{ flex: '1' }}>
          <div class="capture-canvases">
            <span class="capture-canvas">
              <span class="captured-image-number"> 1 </span>
            </span>

            <span class="capture-canvas" style={{ backgroundImage: `url('${this.imageDataUrl}')` }}>
              <span class="captured-image-number"> 2 </span>
            </span>

            <span class="capture-canvas">
              <span class="captured-image-number"> 3 </span>
            </span>

            <span class="capture-canvas">
              <span class="captured-image-number"> 4 </span>
            </span>
          </div>
        </section>
      </div>
    );
  }
}
