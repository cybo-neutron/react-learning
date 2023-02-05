
### **Installation**
```bash
npm install redux
OR
yarn add redux

```

## Creating a redux store

- Import `createStore` factory function from Redux.
- Invoke `createStore()` function to create the store

```js
import {createStore} from 'redux';
const store = createStore(reducer);
```
- Creation and setup of `reducer` will be covered later in this section. 
- `reducer` is the only mandatory argument passed to createStore.

### Relationship b/w store and reducer
The store and reducer are great buddies. Always in sync.

The reducer always talks to the store and keeps all the state in sync.

## Reducer
- Takes two argument
  - `state` of the app
  - `action`  

**Comparing with `Array.reduce`**  
Function passed to `Array.reduce()` is called a `reducer`.


Redux Reducer is just a function that takes two parameter somewhat similar to `Array.reduce()`. 

### Creating reducer
Now, we need to create reducer. 
Create a file `src/reducers/index.js`

```js

expoert default (state)=>{
  return state
}

```