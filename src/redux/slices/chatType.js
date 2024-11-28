import { createSlice } from "@reduxjs/toolkit";

const chatTypeSlice = createSlice({
  name: "chatType",
  initialState: "single",
  reducers: {
    setChatType(state, action) {
      return action.payload;
    }
  }
});


export const { setChatType } = chatTypeSlice.actions;

export default chatTypeSlice.reducer;
