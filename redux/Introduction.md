# Redux basics

- Redux is a predictable state container for JavaScript apps

- **state container** : stores the state of an application
- **predictable** : In redux, a pattern is enforced to ensure all state transitions are explicit and can be tracked.
  - The changes to an application's state become predictable.

## Why use redux?
REdux makes it easy to manage global state of an application in a predictable manner.


## 3 core concepts in redux
- **store** : Holds the action of the application
- **action** : Describes what happened. it is JS object having `type` property.
- **reducer** : Ties the store and actions together. It basically handles the action and describes how to update the state.

## 3 principles in redux
1. The global state of the application is stored as an object inside a **single store**.
2. The only way to change the state is to dispatch an **action**, an object that describes what happened.
3. To specify how the state tree is updated based on actions, we write pure reducers.
   - **reducer** : a function that takes previous state and action as parameter and returns new state
     ```js
     (previousState,action) => newState
     ```


**JS-app** ---- *dispatch* -----> **Action** -------------> **Reducer**-----------> **ReduxStore** ------- *subscribed by* -------> **JS-app**


## Action
- action : aciton is js object which has `type` property.
- action creator : function that returns an action.

`action`
```js
const action = {
    type:'ORDERED',
    payload:1
}
```
`action creator`
```js
function orderItem(qty=1){
    return {
        type:"ORDERED",
        payload:qty
    }
}
```



## Reducer
- reducer is a function that accepts state and action as arguments, and returns the next state of the application.

```js
(prevState,action)=>newState
```
*Generally of the time reducers are created to handle different actions and make use of switch-case statements (though we can use if-else but switch-case looks cleaner)*

## Store
One store for the entire application  
syntax:
```js
const store = createStore(reducer)
```
Responsibilities - 
- Holds application state
- Allows access to state via **getState()**
- Allows state to be updated via **dispatch(action)**
- Registers listeners via **subscribe(listener)**
- Handles unregistering of listeners via the function returned by **subscribe(listener)**.


## Example

### Installation  
`npm install redux`

`example`
```js

const {createStore} = require('redux')

const CAKE_ORDERED = 'CAKE_ORDERED';

//action creators
function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}

const initialState = {
    numCakes :10,
}

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numCakes: state.numCakes - 1,
            }
        default:
            return state;
    }
}


//store

const store = createStore(reducer);

console.log(`Initial State : `,store.getState());

const unsubscribe = store.subscribe(() => {
    console.log('Updated state', store.getState());
})

//dispatch

store.dispatch({
    type: CAKE_ORDERED,
    quantity:1
})

store.dispatch(orderCake())
store.dispatch(orderCake())


//unsubscribing
unsubscribe();

```


### Bind action creators
It binds the `action creators`(functions which return action objects.) with `store dispatch`.


```js
const {bindActionCreators} = require('redux')

const actions = bindActionCreators({actionCreator1,actionsCreator2}, store.dispatch)
actionCreator1()
actionsCreator2(...params)

```



## Multiple reducers
Handling all the actions in a single reducer can make the reducer very crowded.  
We can make different reducers for different use-cases. (for example `auth` reducer, `users` reducer, `movies` reducer). 

But createStore accepts a single reducer. How to make a single store which has multiple reducers??
Well redux provides a functions which helps combine reducers in one `combineReducers`.


```js
const {combineReducers} = require('redux')
const reducer1 = (state,action)=>{...}
const reducer2 = (state,action)=>{...}

const rootReducer = combineReducers({
    r1:reducer1,
    r2:reducer2,
})

const store = createStore(rootReducer);

```
To access the state of any reducers we can use the following
```js
console.log(store.getState().r1.state1)

```

## Immer

Immer is tiny package that makes it easy to work with immutable state. 
So for example in lets say we have a complex state given below - 

```js
const initialState = {
  name: "John",
  address: {
    street: "123 River road",
    city: "Pune",
    state: "Maharashtra",
  },
};

```
Now lets say based on our action we want to change the city. 
Normally we will do something like below - 

```js
{
    ...state,
    address: {
    ...state.address,
    city: action.payload,
    },
};
```

But as the state object gets larger and introduces complex objects within it becomes difficult to maintain such code.  
Immer comes to rescue in this condition 

To use immer install it first  
`npm install immer`  
Then use it in the project

```js
const { produce } = require("immer");

//while changing state we use it something like this
return produce(state, (draft) => {
        draft.address.city = action.payload;
      });
```
A working example can be found [here](./redux-intro/immer.js)


## Middleware

- It is the suggested way to extend Redux with custom functionality.
- Provides a third-party extension point between dipatching an action and the moment it reaches the reducer.
- Use middleware for logging, crash reporting, performing asynchronous tasks etc.
- Middleware sits in between the dispatch and reducers, meaning we can alter out dispatched action before the get to the reducers .
  

### Creating a **custom middleware**
```js
const customMiddleware = (store) => (next) => (action) => {
  console.log("ACTION : ", action.type);
  console.log("     current state ", store.getState());
  const nextState = next(action);
};
```

We can use middleware in the createStore using the `applyMiddleware` function provided by `redux`.

```js
const { createStore, applyMiddleware } = require("redux");

const store = createStore(cakeReducer, applyMiddleware(logger));
```

### Using **third-party middleware**  
Using **redux-logger** library as middleware for logging.

Install it using `npm i redux-logger`.
```js

const { createStore, applyMiddleware } = require("redux");

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const store = createStore(
  cakeReducer,
  applyMiddleware(logger)
);

```

 A working exammple can be seen [**here**](./redux-intro/middleware.js)

## Async Actions
**Thunk** : Thunk is a type of action creator that returns a function instead of an action object.

Async actions are handled by redux-thunk in redux application. They are most commonly used for data fetching(asyncronous actions) but can be used for other tasks as well.

**Adding thunk as middleware**

Install thunk

```
npm i redux-thunk
```

import `thunkMiddleware`
```
const thunkMiddleware = require("redux-thunk").default;

```

Create store and add thunkMiddleware as one of its middleware

```js
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
```
Our async code can sit inside a function which will dispatch an action when our request is completed.

```js
/*
here the following are action creators which we have defined earlier in out program
- fetchUsersRequest
- fetchUsersSuccess
- fetchUsersFailed
*/

const fetchUsers = () => {
  return async function (dispatch) {
    dispatch(fetchUsersRequest());
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const users = res.data.map((elem) => elem.id);
      dispatch(fetchUsersSuccess(users));
    } catch (err) {
      dispatch(fetchUsersFailed(err.message));
    }
  };
};
```

In the above function we can see that the function returns a function which gets `dispatch` as argument and all the action creators are handles as and when required.
to view the code [click here](./redux-intro/asyncActions.js)


Now to fetchUsers and set the state we just need to dispatch this `thunk action creator` (our `fetchUsers` function)
```js
store.dispatch(fetchUsers());

```

