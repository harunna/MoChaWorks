import { applyMiddleware, compose, createStore, Middleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

let middleware: Middleware[] = [thunk];

export default () => {
  return createStore(rootReducer, compose(applyMiddleware(...middleware)));
}