import { PureComponent } from 'react';

export default class PureCounter extends PureComponent {
  state = { count: 0 };

  increment = () => this.setState(({ count }) => ({ count: count + 1 }));

  render() {
    return (
      <div className="card">
        <h3>PureComponent</h3>
        <p>Skips renders when shallow state/props equal previous snapshot.</p>
        <button type="button" onClick={this.increment}>
          Count {this.state.count}
        </button>
      </div>
    );
  }
}
