import { Component, h } from '@stencil/core';

@Component({
  tag: 'init-screen',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class InitScreen {
  render() {
    return (
      <div>
        <h1>Do you want to first change the settings?</h1>

        <div class="p-4">
          <button class="btn btn-primary">primary</button>
          <button class="btn btn-secondary">secondary</button>
          <button class="btn btn-accent">accent</button>
        </div>
      </div>
    );
  }
}
