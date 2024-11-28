import { createSlice } from "@reduxjs/toolkit";

const recieverUser = createSlice({
  name: 'reciever',
  initialState: {
    recieverId: "",
    recieverName: ""
  },
  reducers: {
    setRecieverUser: (state, action) => {

      return { ...state, ...action.payload };
    },
    clearRecieverUser: () => {

      return { recieverId: "", recieverName: "" };
    },
  },
});

export const { setRecieverUser, clearRecieverUser } = recieverUser.actions;
export default recieverUser.reducer;
