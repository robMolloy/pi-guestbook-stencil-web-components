import { Component, h } from '@stencil/core';

@Component({
  tag: 'global-h1',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class GlobalH1 {
  render() {
    return (
      <div style={{ fontSize: '3rem', textAlign: 'center' }}>
        <slot />
      </div>
    );
  }
}
