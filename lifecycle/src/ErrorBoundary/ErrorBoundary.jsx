import React, { Component } from "react";
import DescendantComponent from "./DescendantComponent";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  static getDerivedStateFromError(err) {
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    console.log({ err, info });
  }
  increase() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    if (this.state.hasError) return <p>something went wrong</p>;

    return (
      <div>
        <DescendantComponent count={this.state.count} />
        <button onClick={() => this.increase()}>Increase</button>
      </div>
    );
  }
}
