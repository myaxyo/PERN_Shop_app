import { configureStore, combineReducers, compose } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userSlice from "../features/user/userSlice";
import deviceSlice from "../features/device/deviceSlice";
const rootReducer = combineReducers({
  user: userSlice,
  device: deviceSlice,
});

const store = configureStore(
  {
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk],
  },
  (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
    compose
);

export default store;
