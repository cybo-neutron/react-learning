const { createStore, bindActionCreators, combineReducers } = require("redux");

//action
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTORED = "CAKE_RESTORED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTORED = "ICECREAM_RESTORED";

//action creators
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCakes(qty = 0) {
  return {
    type: CAKE_RESTORED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 0) {
  return {
    type: ICECREAM_RESTORED,
    payload: qty,
  };
}

//Initial state
const cakeInitialStore = {
  numCakes: 10,
};

const iceCreamInitialStore = {
  numIceCream: 10,
};

//reducer
const cakeReducer = (state = cakeInitialStore, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numCakes: state.numCakes - 1,
      };
    case CAKE_RESTORED:
      return {
        ...state,
        numCakes: state.numCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = iceCreamInitialStore, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numIceCream: state.numIceCream - action.payload,
      };
    case ICECREAM_RESTORED:
      return {
        ...state,
        numIceCream: state.numIceCream + action.payload,
      };
    default:
      return state;
  }
};

//store
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer);

console.log(`Initial State : `, store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Updated state", store.getState());
});

// store.dispatch({
//   type: CAKE_ORDERED,
//   quantity: 1,
// });
// store.dispatch(orderCake());

// store.dispatch({
//   type: CAKE_RESTORED,
//   payload: 3,
// });
// store.dispatch(restockCakes(2));

//bind action creators
const actions = bindActionCreators(
  { orderCake, restockCakes, orderIceCream, restockIceCream },
  store.dispatch
);
// actions.orderCake();
// actions.orderCake();
// actions.restockCakes(2);
actions.orderIceCream();

console.log(store.getState().cake);
unsubscribe();
