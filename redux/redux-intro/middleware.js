const { createStore, applyMiddleware } = require("redux");

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTORED = "CAKE_RESTORED";

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

const cakeInitialStore = {
  numCakes: 10,
};

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

const customMiddleware = (store) => (next) => (action) => {
  console.log("ACTION : ", action.type);
  console.log("     current state ", store.getState());
  const nextState = next(action);
};
const store = createStore(
  cakeReducer,
  applyMiddleware(logger, customMiddleware)
);

console.log(`Initial State : `, store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(orderCake());
store.dispatch(orderCake());

unsubscribe();
