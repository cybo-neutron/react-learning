const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
const cakeReducer = require("../features/cake/cakeSlice");
const iceCreamReducer = require("../features/icecream/iceCreamSlice");
const userReducer = require("../features/user/userSlice");

//3rd party middleware
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

//custome middleware
const customMiddleware = (store) => (next) => (action) => {
  console.log("ACTION : ", action.type);
  console.log("     current state ", store.getState());
  const nextState = next(action);
};

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamReducer,
    user: userReducer,
  },
  //   middleware: (getDefaultMiddleware) => {
  //     return getDefaultMiddleware().concat([customMiddleware,logger]);
  //   },
});

module.exports = store;
