import { Component, h, Event, EventEmitter, State } from '@stencil/core';

const getServerLiveStatus = async () => {
  const serverBaseUrl = localStorage.getItem('serverBaseUrl');

  if (!serverBaseUrl) return 'no_base_url_provided';

  let pingServerResponse: Response | undefined = undefined;
  try {
    pingServerResponse = await fetch(`${serverBaseUrl}/ping`);
    if (pingServerResponse?.ok !== true) return 'server_not_found';
  } catch (error) {
    return 'server_not_found';
  }

  try {
    const pingServerJson = await pingServerResponse.json();
    if (pingServerJson?.success !== true) return 'server_found_invalid_response';
  } catch (error) {
    return 'server_found_invalid_response';
  }

  return 'server_found';
};

type TServerLiveStatus = 'uninitialised' | 'initialising' | 'awaiting_response' | 'no_base_url_provided' | 'server_not_found' | 'server_found' | 'server_found_invalid_response';

@Component({
  tag: 'edit-settings-screen',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class EditSettingsScreen {
  @Event()
  clickStartGuestbookCycleButton: EventEmitter;

  @State() serverBaseUrl: string = localStorage.getItem('serverBaseUrl');
  @State() serverLiveStatus: TServerLiveStatus = 'uninitialised';

  async handleServerLiveStatus() {
    this.serverLiveStatus = 'initialising';
    this.serverLiveStatus = await getServerLiveStatus();
  }

  async handleSave() {
    localStorage.setItem('serverBaseUrl', this.serverBaseUrl);
  }

  constructor() {
    this.handleServerLiveStatus();
  }

  render() {
    return (
      <div>
        <div>Server live status: {this.serverLiveStatus}</div>

        <br />

        <label htmlFor="server-base-url-input">server-base-url (include the /):</label>
        <input
          type="text"
          id="server-base-url-input"
          name="server-base-url"
          class="input input-bordered w-full max-w-xs"
          aria-label="Enter the api-base-url"
          required
          onInput={e => {
            const target = e.target as HTMLInputElement;
            this.serverBaseUrl = target.value;
          }}
          value={this.serverBaseUrl}
        />

        <br />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button class="btn btn-primary" onClick={() => this.clickStartGuestbookCycleButton.emit()}>
              Start
            </button>
            <button class="btn btn-accent" onClick={() => this.handleSave()}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
