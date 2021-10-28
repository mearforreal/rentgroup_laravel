import { call, put } from "@redux-saga/core/effects";
import { registerUser, logoutUser } from "../request/userRequest";
import { setUser } from "../../slices/userSlice";

export function* handleGetUser(action) {
  try {
    const response = yield call(registerUser, action.payload);

    const { data } = response;
    yield put(setUser({ ...data }));
  } catch (error) {
    console.error(error);
  }
}

export function* handleLogoutUser(action) {
  try {
    const response = yield call(logoutUser, action.payload);

    const { data } = response;
    yield put(setUser({ ...data }));
  } catch (error) {
    console.error(error);
  }
}
