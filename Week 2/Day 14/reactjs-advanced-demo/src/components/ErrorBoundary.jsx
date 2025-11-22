import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Boundary captured error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error">Something went wrong inside the lazy chunk.</div>;
    }
    return this.props.children;
  }
}
