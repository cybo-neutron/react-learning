import { Component } from "react";
import { createContext } from "react";

const initialState = { name: "Ron", age: 45 };

const { Provider, Consumer } = createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { user: initialState };
  }

  render() {
    return (
      <Provider
        value={{
          user: this.state.user,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { UserProvider as default, Consumer as UserConsusmer };
