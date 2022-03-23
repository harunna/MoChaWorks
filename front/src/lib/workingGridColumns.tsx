import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs, { extend } from "dayjs";
import { Const } from "./commonUtil";
import duration from 'dayjs/plugin/duration';

extend(duration);

export const WorkingGridColumns: GridColDef[] = [
  {
    field: 'workDate',
    headerName: 'WorkDate',
    flex: 1,
    minWidth: 105
  },
  {
    field: 'workStart',
    headerName: 'Start',
    flex: 1,
    editable: true
  },
  {
    field: 'workEnd',
    headerName: 'End',
    flex: 1,
    editable: true,
  },
  {
    field: 'restStart',
    headerName: 'RestStart',
    flex: 1,
    editable: true,
  },
  {
    field: 'restEnd',
    headerName: 'RestEnd',
    flex: 1,
    editable: true,
  },
  {
    field: 'workOver',
    headerName: 'Over',
    flex: 1,
    valueGetter: setWorkOver
  },
  {
    field: 'workTotal',
    headerName: 'Total',
    flex: 1,
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
    const startMmt = dayjs(`${workDate} ${workStart}`);
    const endMmt = dayjs(`${workDate} ${workEnd}`);
    const diff = endMmt.diff(startMmt);
    params.row.workTotal = diffFormat(diff, 'hh:mm:ss');
  }
  return params.row.workTotal;
}

function setWorkOver(params: GridValueGetterParams) {
  const { workTotal } = params.row;
  const totalMmt = dayjs(workTotal, 'hh:mm:ss');
  const basicMmt = dayjs(`0${Const.BASIC_WORK_HOURS}:00:00`, 'hh:mm:ss');
  const diff = totalMmt.diff(basicMmt);
  if (diff > 0) {
    params.row.workOver = diffFormat(diff, 'hh:mm:ss');
  }
  
  return params.row.workOver;
}

function diffFormat(diff: number, format: string) {
  const duration = dayjs.duration(diff);
  const hours = ('0' + duration.hours()).slice(-2);
  const minutes = ('0' + duration.minutes()).slice(-2);
  const seconds = ('0' + duration.seconds()).slice(-2);
  const newFormat = format
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);

    return newFormat;
}