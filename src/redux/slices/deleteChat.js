import { createSlice } from "@reduxjs/toolkit";

const deleteChatSlice = createSlice({
  name: "deleteChat",
  initialState: false,
  reducers: {
    setDeleteChat(state, action) {
      return action.payload;
    },
    resetDeleteChat(state) {
      return false;
    }
  }
});

export const { setDeleteChat, resetDeleteChat } = deleteChatSlice.actions;
export default deleteChatSlice.reducer;
