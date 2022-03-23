import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import moment from "moment";
import { Const } from "./commonUtil";

export const WorkingGridColumns: GridColDef[] = [
  {
    field: 'workDate',
    headerName: 'WorkDate',
    minWidth: 180
  },
  {
    field: 'workStart',
    headerName: 'Start',
    minWidth: 180,
    editable: true
  },
  {
    field: 'workEnd',
    headerName: 'End',
    minWidth: 150,
    editable: true,
  },
  {
    field: 'workOver',
    headerName: 'Over',
    minWidth: 150,
    valueGetter: setWorkOver
  },
  {
    field: 'workTotal',
    headerName: 'Total',
    minWidth: 150,
    valueGetter: setWorkTotal
  },
  {
    field: 'workPlace',
    headerName: 'Place',
    editable: true,
    type: 'singleSelect',
    flex: 1,
    valueOptions: Const.WORKING_PLACE.map(working => {return { label: working.label, value: working.label }})
  }
];

function setWorkTotal(params: GridValueGetterParams) {
  const { workDate, workStart, workEnd } = params.row;
  if (workStart && workEnd) {
    const startMmt = moment(`${workDate} ${workStart}`);
    const endMmt = moment(`${workDate} ${workEnd}`);
    const diff = endMmt.diff(startMmt);
    params.row.workTotal = diffFormat(diff, 'hh:mm:ss');
  }
  return params.row.workTotal;
}

function setWorkOver(params: GridValueGetterParams) {
  const { workTotal } = params.row;
  const totalMmt = moment(workTotal, 'hh:mm:ss');
  const basicMmt = moment(`0${Const.BASIC_WORK_HOURS}:00:00`, 'hh:mm:ss');
  const diff = totalMmt.diff(basicMmt);
  if (diff > 0) {
    params.row.workOver = diffFormat(diff, 'hh:mm:ss');
  }
  
  return params.row.workOver;
}

function diffFormat(diff: number, format: string) {
  const duration = moment.duration(diff);
  const hours = ('0' + duration.hours()).slice(-2);
  const minutes = ('0' + duration.minutes()).slice(-2);
  const seconds = ('0' + duration.seconds()).slice(-2);
  const newFormat = format
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);

    return newFormat;
}