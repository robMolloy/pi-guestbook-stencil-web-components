import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'internal-component2',
  shadow: true,
})
export class InternalComponent2 {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  render() {
    return (
      <div>
        <div>hello here is thhe second</div>
        <button>click to show the next one</button>
      </div>
    );
  }
}
