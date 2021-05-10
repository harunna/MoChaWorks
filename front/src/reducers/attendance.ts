export interface AttendanceState {
  attendanceList: []
}

const initialState: AttendanceState = {
  attendanceList: []
}

type Action = {}

export default (state: AttendanceState = initialState, action: Action): AttendanceState => {
  return {
    ...state
  }
}