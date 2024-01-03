import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'init-screen',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class InitScreen {
  @Event()
  goToStartGuestbookScreen: EventEmitter;

  @Event()
  clickInitScreenEditSettingsButton: EventEmitter;

  render() {
    return (
      <div>
        <h1>Do you want to first change the settings?</h1>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button class="btn btn-primary" onClick={() => this.goToStartGuestbookScreen.emit()}>
              Start
            </button>
            <button class="btn btn-accent" onClick={() => this.clickInitScreenEditSettingsButton.emit()}>
              Edit Settings
            </button>
          </div>
        </div>
      </div>
    );
  }
}
