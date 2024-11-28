import { createSlice } from "@reduxjs/toolkit";

const updateGroupSlice = createSlice({
  name: "updateGroup",
  initialState: false,
  reducers: {

    toggleUpdateGroup(state) {
      return !state;
    },

    setUpdateGroup(state, action) {
      return action.payload;
    },
  },
});

export const { toggleUpdateGroup, setUpdateGroup } = updateGroupSlice.actions;

export default updateGroupSlice.reducer;
