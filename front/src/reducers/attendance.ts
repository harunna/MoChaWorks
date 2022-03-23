import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { AxiosResponse } from "axios"
import moment from "moment"
import { ThunkAction } from "."
import { WorkingGridColumns } from "../lib/workingGridColumns";
import { storage } from "../lib/commonUtil"
import { WebApi } from "../lib/webApi";

export type DataRowModel = {
  id: GridRowId;
  workDate: string;
  workStart: string;
  workEnd: string;
  workOver: string;
  workTotal: string;
  workPlace: string;
}

export interface GridData {
  columns: GridColDef[];
  rows: DataRowModel[];
}

export interface AttendanceState {
  workingList: GridData;
  month: string;
}

const initialState: AttendanceState = {
  workingList: {
    columns: [],
    rows: []
  },
  month: moment().format('yyyy-MM')
}

interface FetchGetAttendanceListSuccess {
  type: 'ATTENDANCE__GET_ATTENDANCE_LIST_SUCCESS',
  payload: {
    data: GridData
  }
}

interface FetchPostAttendanceSuccess {
  type: 'ATTENDANCE__POST_ATTENDANCE_LIST_SUCCESS',
  payload: {
    data: DataRowModel[];
  }
}

function fetchSuccessGetAttendanceList(data: GridData): FetchGetAttendanceListSuccess {
  return {
    type: 'ATTENDANCE__GET_ATTENDANCE_LIST_SUCCESS',
    payload: {
      data
    }
  }
}

function fetchSuccessPostAttendance(data: DataRowModel[]): FetchPostAttendanceSuccess {
  return {
    type: 'ATTENDANCE__POST_ATTENDANCE_LIST_SUCCESS',
    payload: {
      data
    }
  }
}

/**
 * 1か月分の勤務リストを取得する
 * @param month  yyyy-mm
 */
export function getAttendanceList(month: string): ThunkAction<FetchGetAttendanceListSuccess> {
  return async (dispatch) => {
    try {
      if (!storage.userId) { return; }
      const params: AttendanceApi.Get.Request = { userId: storage.userId, month: month };
      const response: AxiosResponse<AttendanceApi.Get.Response[]> = await WebApi.getAttendanceList(dispatch, params);
      // const todayRecord = response.data.find(list => list.workDate === moment().format('YYYY-MM-DD'));
      dispatch(fetchSuccessGetAttendanceList(createAttendanceRows(response.data)));
    } catch(err) {
    }
  }
}

function createAttendanceRows(workingList: AttendanceApi.Get.Response[]): GridData {
  return {
    columns: WorkingGridColumns,
    rows: workingList.map(list => {
      return {
        id: list.workDate,
        workDate: list.workDate,
        workStart: list.workRecord.start,
        workEnd: list.workRecord.end,
        workOver: list.overtime,
        workTotal: list.total,
        workPlace: list.workRecord.place
      }
    })
  }
}

/**
 * 勤怠情報を登録する
 * @param params 
 */
export function postAttendance(gridData: DataRowModel): ThunkAction<FetchPostAttendanceSuccess> {
  return async (dispatch, getState) => {
    if (!storage.userId) { return ;}
    const params: AttendanceApi.Post.Request = {
      userId: storage.userId,
      workDate: gridData.workDate,
      workRecord: {
        start: gridData.workStart,
        end: gridData.workEnd,
        place: gridData.workPlace
      },
      total: gridData.workTotal,
      overtime: gridData.workOver
    }

    try {
      await WebApi.postAttendance(dispatch, params);
      const workingList = getState().attendance.workingList;
      const editRowIndex = workingList.rows.findIndex((row) => row.id === gridData.id);
      if (editRowIndex > -1) {
        let newRows = [ ...workingList.rows ];
        newRows[editRowIndex] = gridData;

        dispatch(fetchSuccessPostAttendance(newRows));
      }
    } catch(e) {
      console.error(e);
    }
  }
}

type Action = FetchGetAttendanceListSuccess | FetchPostAttendanceSuccess;

export default (state: AttendanceState = initialState, action: Action): AttendanceState => {
  switch(action.type) {
    case 'ATTENDANCE__GET_ATTENDANCE_LIST_SUCCESS':
      return {
        ...state,
        workingList: {
          ...action.payload.data
        }
      }

    case 'ATTENDANCE__POST_ATTENDANCE_LIST_SUCCESS':
      return {
        ...state,
        workingList: {
          ...state.workingList,
          rows: action.payload.data
        }
      }

    default:
      return { ...state }
  }
}