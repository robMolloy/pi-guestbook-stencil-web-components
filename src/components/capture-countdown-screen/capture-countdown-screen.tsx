import { Component, Element, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { delay, onCountdown, getImageDataUrlFromVideoElement, sendImageDataUrlToPrint } from '../../utils';

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
  @State() imageDataUrls: [string | undefined, string | undefined, string | undefined, string | undefined] = [undefined, undefined, undefined, undefined];
  @State() selectedImageDataUrl: string | undefined = undefined;
  @State() captureSequenceStatus: 'initial' | 'countdown' | 'capturing' | 'selecting' = 'initial';

  @Event() goToStartGuestbookScreen: EventEmitter;
  @Event() goToPrintPhotoSuccessScreen: EventEmitter;
  @Event() goToPrintPhotoFailScreen: EventEmitter<string>;
  @Event() startCaptureCountdown: EventEmitter;

  @Element() el: HTMLElement;

  async captureSequence(p: { videoElement: HTMLVideoElement }) {
    const videoElement = p.videoElement;

    for (const num of [0, 1, 2, 3]) {
      if (num !== 0) await delay(2000);
      this.imageDataUrls[num] = getImageDataUrlFromVideoElement({ videoElement });
      this.imageDataUrls = [...this.imageDataUrls];
    }

    return;
  }

  componentDidLoad() {
    const videoElement = this.el.shadowRoot.querySelector('video');
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
            <button
              class="btn btn-primary"
              disabled={this.selectedImageDataUrl === undefined}
              onClick={async () => {
                const response = await sendImageDataUrlToPrint({ imageDataUrl: this.selectedImageDataUrl });

                const alwaysTrue = true;
                if (response?.success || alwaysTrue) return this.goToPrintPhotoSuccessScreen.emit();

                this.goToPrintPhotoFailScreen.emit(response.error);
              }}
            >
              Print photo
            </button>
            <button class="btn btn-accent" onClick={() => this.goToStartGuestbookScreen.emit()}>
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
