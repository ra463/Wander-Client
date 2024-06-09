import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
const name = localStorage.getItem("name");
const email = localStorage.getItem("email");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
    name: name,
    email: email,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    removeToken: (state, action) => {
      state.token = null;
      state.name = null;
      state.email = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
