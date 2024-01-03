import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'start-guestbook-screen',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class StartCaptureCountdown {
  @Prop() width: number;
  @Prop() height: number;
  @Event()
  startCaptureCountdown: EventEmitter;

  @Element() el: HTMLElement;

  componentDidLoad() {
    const video = this.el.shadowRoot.querySelector('video');
    video.srcObject = window.streamData;
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onClick={() => this.startCaptureCountdown.emit()}>
        <global-h1>Tap anywhere for the countdown to begin</global-h1>

        <br />
        <div style={{ height: '37vh', position: 'relative' }}>
          <video style={{ transform: 'scaleX(-1)', width: '100%', height: '100%' }} width={this.width} height={this.height} autoplay></video>
        </div>
      </div>
    );
  }
}
