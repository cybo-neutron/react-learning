const store = require("./app/store");
const { cakeActions } = require("./features/cake/cakeSlice");
const { iceCreamActions } = require("./features/icecream/iceCreamSlice");

const { userActions, fetchUsers } = require("./features/user/userSlice");

console.log("Initial State : ", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("Updated state : ", store.getState());
});

store.dispatch(fetchUsers());

// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.restocked(4));

// store.dispatch(iceCreamActions.ordered());

// unsubscribe();
