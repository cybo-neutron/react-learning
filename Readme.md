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
- When `dispatch ` is called React automatically calls the reducer with action provided to the dispatch function
