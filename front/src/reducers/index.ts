import { combineReducers } from "redux";
import attendance, { AttendanceState } from "./attendance";
import auth, { AuthState } from "./auth";

export type ThunkAction<A> = (dispatch: (a: A) => void | Promise<void>, getState: () => State) => void | Promise<void> | Promise<any>;

export interface State {
  attendance: AttendanceState;
  auth: AuthState;
}

export default combineReducers<State>({
  attendance,
  auth
});