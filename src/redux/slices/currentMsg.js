import { createSlice } from "@reduxjs/toolkit";

// Create the slice

const currentMsgSlice = createSlice({
  name: "currentMsg",
  initialState: null,
  reducers: {
    setCurrentMsg: (state, action) => {
      return action.payload;
    },
    clearCurrentMsg: () => {
      return "";
    },
  },
});

export const { setCurrentMsg, clearCurrentMsg } = currentMsgSlice.actions;

export default currentMsgSlice.reducer;
