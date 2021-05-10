import { combineReducers } from "redux";
import attendance, { AttendanceState } from "./attendance";

export interface State {
  attendance: AttendanceState  
}

export default combineReducers<State>({
  attendance
});