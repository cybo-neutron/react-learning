import React, { useReducer } from "react";

//initial state
const initial_state = { count: 0 };
//reducer
const reducer = (state, action) => {
  const { type, value = 1 } = action || {};
  if (!type) throw new Error("Action type must be defined");

  switch (type) {
    case "increment":
      return { count: state.count + value };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error("Invalid action type!! Check the spelling again");
  }
};

function BasicReducer() {
  //calling the useReducer
  const [state, dispatch] = useReducer(reducer, initial_state);
  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: "decrement" });
        }}
      >
        -
      </button>
      {state.count}
      <button
        onClick={() => {
          dispatch({ type: "increment" });
        }}
      >
        +
      </button>
      <br />
      <button
        onClick={() => {
          dispatch({ type: "increment", value: 5 });
        }}
      >
        Increase by 5
      </button>
    </div>
  );
}

export default BasicReducer;
