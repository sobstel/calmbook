import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { MakeStore } from "next-redux-wrapper";
import { searchReducer } from "./searchSlice";

const devMode = process.env.NODE_ENV === "development";

const rootReducer = combineReducers([searchReducer]);

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([]);
}

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore: MakeStore = (initialState: RootState) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: devMode,
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
    preloadedState: initialState,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
