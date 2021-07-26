import { AxiosResponse } from "axios"
import { ThunkAction } from "."
import { storage } from "../lib/commonUtil"
import { WebApi } from "../lib/webApi"

export interface AttendanceState {
  attendanceList: AttendanceApi.Get.Response[]
}

const initialState: AttendanceState = {
  attendanceList: []
}

interface FetchAttendanceListSuccess {
  type: 'ATTENDANCE__GET_ATTENDANCE_LIST_SUCCESS',
  payload: {
    data: AttendanceApi.Get.Response[]
  }
}

function fetchSuccessGetAttendanceList(data: AttendanceApi.Get.Response[]): FetchAttendanceListSuccess {
  return {
    type: 'ATTENDANCE__GET_ATTENDANCE_LIST_SUCCESS',
    payload: {
      data
    }
  }
}

/**
 * 1か月分の勤務リストを取得する
 * @param workDate 
 */
export function getAttendanceList(workDate: string): ThunkAction<FetchAttendanceListSuccess> {
  return async (dispatch, getState) => {
    try {
      if (!storage.userId) { return ;}
      const params: AttendanceApi.Get.Request = { user_id: storage.userId, work_date: workDate };
      const response: AxiosResponse<AttendanceApi.Get.Response[]> = await WebApi.getAttendanceList(dispatch, params);
      dispatch(fetchSuccessGetAttendanceList(response.data))
    } catch(err) {
    }
  }
}

type Action = FetchAttendanceListSuccess;

export default (state: AttendanceState = initialState, action: Action): AttendanceState => {
  switch(action.type) {
    case 'ATTENDANCE__GET_ATTENDANCE_LIST_SUCCESS':
      return {
        ...state,
        attendanceList: action.payload.data
      }
    default:
      return { ...state }
  }
}