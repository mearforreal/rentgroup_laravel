import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {};

const getAuthState = () => {
  const auth = localStorage.getItem("auth");
  try {
    const authobj = JSON.parse(auth);
    const { token, user } = authobj;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return authobj;
  } catch (error) {
    return initialState;
  }
};

const localState = getAuthState();

export const userSlice = createSlice({
  name: "user",
  initialState: localState,
  reducers: {
    getUser: (state) => state,
    setUser: (state, action) => {
      const userState = { ...state, ...action.payload };
      localStorage.setItem("auth", JSON.stringify(userState));
      return userState;
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
      return action.payload;
    },
  },
});

//Selectors
export const selectEmail = (state) => state.user.email;
export const selectUser = (state) => state.user.user;

export const { getUser, setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
