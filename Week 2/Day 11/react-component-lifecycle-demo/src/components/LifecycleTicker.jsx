import { Component } from 'react';

export default class LifecycleTicker extends Component {
  state = { ticks: 0 };

  componentDidMount() {
    // demonstrates side-effects after mount
    this.intervalId = setInterval(() => this.setState(({ ticks }) => ({ ticks: ticks + 1 })), this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.ticks % 2 === 0; // skip re-render to make lifecycle noticeable
  }

  render() {
    return (
      <div className="alert alert-info">
        componentDidMount started a timer. Only even ticks trigger UI updates: {this.state.ticks}
      </div>
    );
  }
}
