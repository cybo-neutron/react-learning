## **useReducer**
`useReducer` hook is an alternative to `useState`. It offers more control on the next state value based on a given action.

### **When to use `useReducer`**
- The shape of state object is complex.
- Apply special logic on ceratin actions to calculate the next state.

It can also be achieved with `useState` hook. However, it would be more complex.

### **Syntax**
`useReducer` hook accepts three arguments:
- Reducer : 
- Initial State:
- Init Callback: 

```js
const [state, dispatch] = useReducer(reducer, initialState, initCb);
```

- `useReducer` returns an array with `state` value and `dispatch` function.
- `dispatch` function may be compared to `setState` function.
- When `dispatch ` is called React automatically calls the reducer with action provided to the dispatch function.
- dispatch({type:"",message:"})

When dispatch is called internally React automatically calls the reducer with action provied in `dispatch` function.  
`dispatch({type:"increment"})` -> `reducer(state,{type:'increment'})`

**Example**
```js
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



//calling the useReducer
  const [state, dispatch] = useReducer(reducer, initial_state);

//calling for dispatch
dispatch({ type: "increment", value: 5 });

```