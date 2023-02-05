const { createStore } = require("redux");
const { produce } = require("immer");

const initialState = {
  name: "John",
  address: {
    street: "123 River road",
    city: "Pune",
    state: "Maharashtra",
  },
};

const CHANGE_CITY = "CHANGE_CITY";

const changeCity = (city = "") => {
  return {
    type: CHANGE_CITY,
    payload: city,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CITY:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       city: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.city = action.payload;
      });
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial state : ", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Updated state", store.getState());
});

store.dispatch(changeCity("Mumbai"));

unsubscribe();
