import { Component } from 'react';

export default class ClassCounter extends Component {
  state = { count: 0 };

  increment = () => this.setState(({ count }) => ({ count: count + 1 }));

  render() {
    return (
      <article className="card">
        <h3>Class Component</h3>
        <p>State is managed with setState inside class components.</p>
        <div className="counter">
          <button type="button" onClick={this.increment}>
            +
          </button>
          <span>{this.state.count}</span>
        </div>
      </article>
    );
  }
}
