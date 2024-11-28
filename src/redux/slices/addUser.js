import { createSlice } from "@reduxjs/toolkit";

const addUserSlice = createSlice({
  name: "addUser",
  initialState: {
    id: null,
    fullName: null,
  },
  reducers: {
    setAddUser(state, action) {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
    },
    clearAddUser(state) {
      state.id = null;
      state.fullName = null;
    },
  },
});

export const { setAddUser, clearAddUser } = addUserSlice.actions;

export default addUserSlice.reducer;
