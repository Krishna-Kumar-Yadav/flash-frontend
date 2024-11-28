import { createSlice } from "@reduxjs/toolkit";

const isDarkerSlice = createSlice({
  name: 'isDarker',
  initialState: true,
  reducers: {
    setColorMode: (state, action) => {
      return typeof action.payload === 'boolean' ? action.payload : !state; // Toggle or set explicitly
    }
  }
});


export const { setColorMode } = isDarkerSlice.actions;
export default isDarkerSlice.reducer;
