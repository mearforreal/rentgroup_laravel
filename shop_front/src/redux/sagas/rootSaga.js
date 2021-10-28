import { takeLatest } from "@redux-saga/core/effects";
import { handleGetUser, handleLogoutUser } from "./handler/userHandler";
import { getUser, logoutUser } from "../slices/userSlice";

export function* watcherSaga() {
  yield takeLatest(getUser.type, handleGetUser);
  yield takeLatest(logoutUser.type, handleLogoutUser);
}
