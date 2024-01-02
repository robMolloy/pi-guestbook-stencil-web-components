import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'internal-component',
  shadow: true,
})
export class InternalComponent {
  // @State() status: 'init' | 'other' = 'init';
  @State() status: string = 'init';

  handleNextScreen() {
    this.status = 'other';
  }

  render() {
    return (
      <div id="root">
        status: string = {this.status};
        {this.status === 'init' && (
          <div>
            <div>hello here is thhe first</div>
            <button onClick={() => this.handleNextScreen()}>click to show the next one</button>
          </div>
        )}
        {this.status === 'other' && <internal-component2 />}
      </div>
    );
  }
}
