import { Component, Event, h, State, EventEmitter } from '@stencil/core';
import { onCountdown } from '../../utils';

@Component({
  tag: 'print-photo-success-screen',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class RootComponent {
  @State() countdownInt: number | undefined = 1;
  @Event() goToStartGuestbookScreen: EventEmitter;

  componentDidLoad() {
    (async () => {
      await onCountdown(this.countdownInt, (i: number) => (this.countdownInt = i));
      this.countdownInt = undefined;
    })();
  }

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
          <global-h1>Success</global-h1>
          <global-h2>your photo is printing, please wait...</global-h2>

          {this.countdownInt !== undefined && <global-h1>{this.countdownInt}</global-h1>}
          {this.countdownInt === undefined && (
            <div>
              <br />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button class="btn btn-accent" onClick={() => this.goToStartGuestbookScreen.emit()}>
                  Start again
                </button>
              </div>
            </div>
          )}
        </span>
      </div>
    );
  }
}
