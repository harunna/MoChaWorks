import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { AxiosResponse } from "axios"
import moment from "moment"
import { ThunkAction } from "."
// import { WorkingGridColumns } from "../components/organisms/WorkingGrid/presentaion";
import { Const, storage } from "../lib/commonUtil"
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
  workingList: GridData | null;
  month: string;
}

const initialState: AttendanceState = {
  workingList: null,
  month: moment().format('yyyy-MM')
}

interface FetchAttendanceListSuccess {
  type: 'ATTENDANCE__GET_ATTENDANCE_LIST_SUCCESS',
  payload: {
    data: GridData
  }
}

function fetchSuccessGetAttendanceList(data: GridData): FetchAttendanceListSuccess {
  return {
    type: 'ATTENDANCE__GET_ATTENDANCE_LIST_SUCCESS',
    payload: {
      data
    }
  }
}

const WorkingGridColumns: GridColDef[] = [
  { 
    field: 'workDate',
    headerName: 'WorkDate',
    headerClassName: 'list-view-theme--header',
    minWidth: 180,
  },
  {
    field: 'workStart',
    headerName: 'Start',
    headerClassName: 'list-view-theme--header',
    minWidth: 180,
    editable: true,
  },
  {
    field: 'workEnd',
    headerName: 'End',
    headerClassName: 'list-view-theme--header',
    minWidth: 150,
    editable: true,
  },
  {
    field: 'workOver',
    headerName: 'Over',
    headerClassName: 'list-view-theme--header',
    minWidth: 150,
  },
  {
    field: 'workTotal',
    headerName: 'Total',
    headerClassName: 'list-view-theme--header',
    minWidth: 150,
  },
  {
    field: 'workPlace',
    headerName: 'Place',
    headerClassName: 'list-view-theme--header',
    editable: true,
    type: 'singleSelect',
    flex: 1,
    valueOptions: Const.WORKING_PLACE.map(working => {return { label: working.value, value: working.value }}),
  }
];

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
        id: list.work_date,
        workDate: list.work_date,
        workStart: list.work_record.start,
        workEnd: list.work_record.end,
        workOver: list.overtime,
        workTotal: list.total,
        workPlace: list.work_record.place
      }
    })
  }
}

type Action = FetchAttendanceListSuccess;

export default (state: AttendanceState = initialState, action: Action): AttendanceState => {
  switch(action.type) {
    case 'ATTENDANCE__GET_ATTENDANCE_LIST_SUCCESS':
      return {
        ...state,
        workingList: action.payload.data
      }

    default:
      return { ...state }
  }
}