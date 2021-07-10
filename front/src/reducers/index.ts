import { combineReducers } from "redux";
import attendance, { AttendanceState } from "./attendance";
import auth, { AuthState } from "./auth";

export interface State {
  attendance: AttendanceState;
  auth: AuthState;
}

export default combineReducers<State>({
  attendance,
  auth
});