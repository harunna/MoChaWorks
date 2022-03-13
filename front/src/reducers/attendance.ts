import { AxiosResponse } from "axios"
import moment from "moment"
import { ThunkAction } from "."
import { storage } from "../lib/commonUtil"
import { WebApi } from "../lib/webApi"

export interface AttendanceState {
  attendanceList: AttendanceApi.Get.Response[];
  month: string;
}

const initialState: AttendanceState = {
  attendanceList: [],
  month: moment().format('yyyy-MM')
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
 * @param month  yyyy-mm
 */
export function getAttendanceList(month: string): ThunkAction<FetchAttendanceListSuccess> {
  return async (dispatch) => {
    try {
      if (!storage.userId) { return ;}
      const params: AttendanceApi.Get.Request = { user_id: storage.userId, month: month };
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