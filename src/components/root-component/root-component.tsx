import { Component, h, State } from '@stencil/core';

type TScreenStatus = 'init_screen' | 'init_settings_screen';

@Component({
  tag: 'root-component',
  shadow: true,
})
export class RootComponent {
  @State() screenStatus: TScreenStatus = 'init_screen';

  render() {
    return (
      <div>
        {this.screenStatus === 'init_screen' && <init-screen />}
        {/* <internal-component /> */}
      </div>
    );
  }
}
