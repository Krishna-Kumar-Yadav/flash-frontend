import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "file",
  initialState: {
    content: null,
    size: null,
    type: null,
    lastModified: null,
  },
  reducers: {
    setCurrentFile(state, action) {
      state.content = action.payload.content;
      state.size = action.payload.size;
      state.type = action.payload.type;
      state.lastModified = action.payload.lastModified;
    },
    resetCurrentFile(state) {
      state.content = null;
      state.size = null;
      state.type = null;
      state.lastModified = null;
    },
  },
});

export const { setCurrentFile, resetCurrentFile } = fileSlice.actions;
export default fileSlice.reducer;
