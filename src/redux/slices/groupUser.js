import { createSlice } from "@reduxjs/toolkit";

const groupUserSlice = createSlice({
  name: "groupUser",
  initialState: {
    name: "",
    adminId: {},
    users: []
  },
  reducers: {
    setGroupUser(state, action) {
      state.name = action.payload.name;
      state.adminId = action.payload.adminId;
      state.users = action.payload.users;
    },
    clearGroupUser(state) {
      state.name = "";
      state.adminId = "";
      state.users = [];
    }
  }
});

export const { setGroupUser, clearGroupUser } = groupUserSlice.actions;
export default groupUserSlice.reducer;
