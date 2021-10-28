import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import createSagaMiddleware from "@redux-saga/core";
import { watcherSaga } from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);

export default store;
