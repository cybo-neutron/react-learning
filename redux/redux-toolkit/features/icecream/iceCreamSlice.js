const { createSlice } = require("@reduxjs/toolkit");
const { cakeActions } = require("../cake/cakeSlice");

const iceCreamSlice = createSlice({
  name: "iceCream",
  initialState: {
    numIceCream: 20,
  },
  reducers: {
    ordered: (state) => {
      state.numIceCream -= 1;
    },
    restocked: (state, action) => {
      state.numIceCream += action.payload;
    },
  },
  //   extraReducers: {
  //     ["cake/ordered"]: (state) => {
  //       state.numIceCream--;
  //     },
  //   },
  extraReducers: (builder) => {
    builder.addCase(cakeActions.ordered, (state) => {
      state.numIceCream--;
    });
  },
});

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;
