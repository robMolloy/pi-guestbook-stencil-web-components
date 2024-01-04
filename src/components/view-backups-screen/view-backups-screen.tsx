import { Component, h, State } from '@stencil/core';
import { retrieveBackupImageDataUrls, retrieveBackupImageList } from '../../utils';

@Component({
  tag: 'view-backups-screen',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class ViewBackupsScreen {
  @State() imageListStatus: 'loading' | 'error' | 'loaded' = 'loading';
  @State() imageList: { [k: string]: string[] | undefined } = {};

  constructor() {
    (async () => {
      const imageListResponse = await retrieveBackupImageList();
      if (imageListResponse?.success !== true) return (this.imageListStatus = 'error');

      const imageList = {};
      imageListResponse.data.forEach(x => (imageList[x] = undefined));

      this.imageList = imageList;
      this.imageListStatus = 'loaded';
    })();
  }

  render() {
    return (
      <div>
        {this.imageListStatus === 'loading' && <div>loading...</div>}
        {this.imageListStatus === 'error' && <div style={{ backgroundColor: 'red' }}>error</div>}
        {this.imageListStatus === 'loaded' &&
          Object.entries(this.imageList).map(([k, v]) => (
            <div style={{ padding: '10px' }}>
              <div>
                {k}
                <button
                  class="btn btn-primary"
                  onClick={async () => {
                    const resp = await retrieveBackupImageDataUrls(k);
                    if (resp?.success !== true) return (this.imageListStatus = 'error');

                    this.imageList[k] = resp.data;
                    this.imageList = { ...this.imageList };
                    this.imageListStatus = 'loaded';
                  }}
                >
                  load images
                </button>
              </div>
              {v !== undefined && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  {v.map(item => (
                    <div
                      style={{
                        minWidth: '175px',
                        minHeight: '175px',
                        backgroundImage: `url('${item}')`,
                        backgroundSize: 'cover',
                        backgroundposition: 'center',
                        border: '1px solid black',
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    );
  }
}
