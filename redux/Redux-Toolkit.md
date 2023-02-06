# Why redux toolkit
First lets look into the shotcomings of redux
- Configuring redux in an app seems complicated.
- A lot of packages have to be installed to get redux do something useful.
- Redux requires too much boilerplate code.

Redux toolkit is an abstraction over redux. It hides the difficult part ensuring we have a good developer experience.

## Setup

To create a redux-toolkit application follow the below steps
- create a folder (eg. rtk)
- inside the folder(rtk) run the command `npm init -y`
- now install redux-toolkit `npm i @reduxjs/toolkit`
- Now follow the following directory structure
    ```
    |-- index.js
    |-- app
        |-- store.js
    |-- features
        |-- cake
        |-- icecream

    ```


## Slice
Slice handles a specific piece of state data of our application's global state object.  
Dividing the global state into slices makes it easier to organize and handle complex states changes.

- createSlice uses immer library under the hood. we can directly mutate the state in reducers. we dont need to return a new state.
- we don't need to define actions explicitly. createSlice automatically generates the action creators with the same name as reducer function.

**Steps of creating a slice**
- import `createSlice` from `reduxjs/toolkit`.
  ```js
    const { createSlice } = require("@reduxjs/toolkit");
  ```
- define an initial state
  ```js
  const initialState = {
    numCakes: 10,
    };
  ```
- create Slice-> createSlice takes an object as parameter and inside the object 3 properties needs to be definied.(name,initialState,reducers)
  ```js
    const cakeSlice = createSlice({
        name: "cake",
        initialState,
        reducers: {
            ordered: (state) => {
            state.numCakes--;
            },
            restocked: (state, action) => {
            state.numCakes += action.payload;
            },
        },
    });
  ```
- export `reducer` and `actions` 
  ```js
    module.exports = cakeSlice.reducer;
    module.exports.cakeActions = cakeSlice.actions;
  ```


## Setting up the store

Create a `store.js` in `app` directory and write the following code.

```js
const { configureStore } = require("@reduxjs/toolkit");
const cakeReducer = require("../features/cake/cakeSlice");

const store = configureStore({
  reducer: {
    cake: cakeReducer,
  },
});

module.exports = store;
```

## Usage

```js
//import store and actions
const store = require("./app/store");
const { cakeActions } = require("./features/cake/cakeSlice");

// Logging the initial state of the store
console.log("Initial State : ", store.getState());
// subscribe to store
const unsubscribe = store.subscribe(() => {
  console.log("Updated state : ", store.getState());
});

store.dispatch(cakeActions.ordered());

//ubsubscribing
unsubscribe();

```

## Middleware

We can define our middleware while configuring our store.

```js
const store = configureStore({
  reducer: {
   ...
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([middleware1,middleware2]);
  },
});
```

## Extra-Reducer

Suppose we want to change the state of one slice based upon the action on aother slice. 
How do we accomplish it??
Well, to achive this we have got `extraReducers`.

`slice1`
```js
    const slice1 = createSlice({
    name: "slice1",
    initialState,
    reducers: {
        action1: (state) => {
            ...
        },
        action2: (state, action) => {
            ...
        },
    },
    });
```

`slice2`
```js
    const slice2 = createSlice({
    name: "slice2",
    initialState,
    reducers: {
        action1: (state) => {
            ...
        },
        action2: (state, action) => {
            ...
        },
    },
    });
```

Now when we dispatch `slice1Reducer.action1` only `slice1` state is changed. But we also need to change the state of `slice2` wehen `action1` of `slice1` is triggerred.

For this we will use `extraReducers` in `slice2`.
```js
    const slice2 = createSlice({
    name: "slice2",
    initialState,
    reducers: {
        action1: (state) => {
            ...
        },
        action2: (state, action) => {
            ...
        },
    },
    extraReducers:{
        ['slice1/action1']:(state)=>{
            //change the state according to your requirement
        }
    }
    });
```
A prefered way of defining extraReducers is using a build function

```js
extraReducers: (builder) => {
    builder.addCase(slice1Actions.action1, (state) => {
        //Change of state as per requirement
    });
  },
```


# Async Thunk  in redux-toolkit for changing the state based on asyncronous tasks

`asyncThunk` referes to the thunk that performs asyncronous operations, similar to a regular thunk in redux.
In redux-toolkit we make an asyncThunk with `createAsyncThunk` function which dispatches actions for the `pending`,`fulfilled` and `rejected` states automatically.  
In our `createSlice` function we handle these 3 actions in the `extraReducers` section.

- Creating a async thunk
  ```js
  // Genereates pending, fullfilled, rejected action types.
  const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
    return axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.data.map((user) => user.id));
  });
  ```
- createSlice
  ```js
  const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      });

      builder.addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload;
      });
    },
  });

  ```
- Now along with `reducers` and `actions` we also need to export the async thunk function (in this case `fetchUsers`)
  ```js
  module.exports = userSlice.reducer;
  module.exports.userActions = userSlice.actions;
  module.exports.fetchUsers = fetchUsers;
  ```

That was all about creating slice.  
Dont forget to configure it in the store.  
Then at last comes the moment of testing and execution of the async thunk function. Let see it in action


Remember to remove the `unsubscribe` function for the async thunk function to execute and reflect the change in the state.

```js
const { userActions, fetchUsers } = require("./features/user/userSlice");

store.dispatch(fetchUsers());
```