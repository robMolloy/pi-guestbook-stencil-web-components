import { Component, h, Event, EventEmitter, State } from '@stencil/core';
import { getServerLiveStatus } from '../../utils/fetchUtils/getServerLiveStatus';
import { getSettingsFromLocalStorage, paperSizeTranslator, setSettingsInLocalStorage } from '../../utils/settings/settings';

type TServerLiveStatus = 'uninitialised' | 'initialising' | 'awaiting_response' | 'no_base_url_provided' | 'server_not_found' | 'server_found' | 'server_found_invalid_response';

@Component({
  tag: 'edit-settings-screen',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class EditSettingsScreen {
  @Event() goToStartGuestbookScreen: EventEmitter;

  @State() serverLiveStatus: TServerLiveStatus = 'uninitialised';
  @State() serverLiveStatusColorIndicator: 'orange' | 'red' | 'green' = 'orange';
  @State() serverBaseUrl: string = localStorage.getItem('serverBaseUrl');
  @State() paperSizeKey: string = localStorage.getItem('paperSizeKey');
  @State() settings: { [k: string]: string | number | null } = getSettingsFromLocalStorage();

  async handleServerLiveStatus() {
    this.serverLiveStatus = 'initialising';
    this.serverLiveStatusColorIndicator = 'orange';

    const serverLiveStatusResponse = await getServerLiveStatus();
    this.serverLiveStatus = serverLiveStatusResponse.status;
    this.serverLiveStatusColorIndicator = serverLiveStatusResponse.success ? 'green' : 'red';
  }

  async handleSave() {
    const stats = paperSizeTranslator[this.paperSizeKey];
    setSettingsInLocalStorage({
      paperSizeKey: this.paperSizeKey,
      paperSizeLabel: stats.label,
      paperSizeWidth: stats.width,
      paperSizeHeight: stats.height,
      paperSizeAspectRatio: stats.aspectRatio,
      serverBaseUrl: this.serverBaseUrl,
      serverPrintImageEndpoint: stats.printImageEndpoint,
      serverBackupImagesEndpoint: stats.backupImagesEndpoint,
    });

    this.settings = getSettingsFromLocalStorage();
  }

  constructor() {
    this.handleServerLiveStatus();
  }

  render() {
    return (
      <div>
        <div>
          Server live status:
          <span onClick={() => this.handleServerLiveStatus()} style={{ backgroundColor: this.serverLiveStatusColorIndicator }}>
            {this.serverLiveStatus}
          </span>
        </div>

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

        <span>Select paper size:</span>
        {Object.entries(paperSizeTranslator).map(([k, v]) => {
          return (
            <div class="form-control">
              <label style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input type="radio" name="radio-10" class="radio checked:bg-red-500" onClick={() => (this.paperSizeKey = k)} checked={this.paperSizeKey === k} />
                <span class="label-text">{v.label}</span>
              </label>
            </div>
          );
        })}

        <pre>{JSON.stringify(this.settings, undefined, 2)}</pre>
        <br />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button class="btn btn-primary" onClick={() => this.goToStartGuestbookScreen.emit()}>
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
