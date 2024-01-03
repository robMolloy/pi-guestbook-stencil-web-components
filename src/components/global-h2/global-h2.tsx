import { Component, h } from '@stencil/core';

@Component({
  tag: 'global-h2',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class GlobalH2 {
  render() {
    return (
      <div style={{ fontSize: '1.4rem', textAlign: 'center' }}>
        <slot />
      </div>
    );
  }
}
