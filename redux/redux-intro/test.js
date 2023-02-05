const { createStore, bindActionCreators } = require("redux");

const initialState = {
  qty: 10,
};

const BUY = "BUY";
const SELL = "SELL";
const RESTOCK = "RESTOCK";

function buy(quantity = 1) {
  return { type: BUY, quantity };
}

function sell(quantity = 1) {
  return { type: SELL, quantity };
}

function restock() {
  return { type: RESTOCK };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY:
      return {
        ...state,
        qty: state.qty + action.quantity,
      };
    case SELL:
      if (state.qty < action.quantity)
        throw new Error(
          "Cannot sell : selling quantity should be less than or equal to the quantity present"
        );
      return {
        ...state,
        qty: state.qty - action.quantity,
      };
    case RESTOCK:
      return {
        ...state,
        qty: initialState.qty,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial state : ", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("Updated State : ", store.getState());
});

store.dispatch(buy());
store.dispatch(sell());

const actions = bindActionCreators({ buy, sell }, store.dispatch);

actions.buy(10);
try {
  actions.sell(21);
} catch (err) {
  console.log(err.message);
}

unsubscribe();
