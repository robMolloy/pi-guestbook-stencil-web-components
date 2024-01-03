import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'print-photo-fail-screen',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class RootComponent {
  @Event() goToStartGuestbookScreen: EventEmitter;
  @Prop() error: string | undefined;

  render() {
    return (
      <div
        style={{
          height: '90vh',
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>
          <global-h1>Error</global-h1>
          <global-h2>Something went wrong</global-h2>

          <br />

          <button class="btn btn-primary" onClick={() => this.goToStartGuestbookScreen.emit()}>
            Tap to try again
          </button>

          <br />
          <br />

          <div>Error: {this.error === undefined ? 'unknown' : this.error}</div>
        </span>
      </div>
    );
  }
}
