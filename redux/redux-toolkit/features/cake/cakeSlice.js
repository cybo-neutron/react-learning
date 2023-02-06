const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  numCakes: 10,
};

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

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;
