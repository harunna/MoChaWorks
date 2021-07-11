import { applyMiddleware, compose, createStore, Middleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

let middleware: Middleware[] = [thunk, loggerMiddleware];

export default () => {
  return createStore(rootReducer, compose(applyMiddleware(...middleware)));
}