import { GridColDef, GridValueFormatterParams, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs, { extend } from "dayjs";
import { Const } from "../../../lib/commonUtil";
import duration from 'dayjs/plugin/duration';

extend(duration);

export const GridColumns: GridColDef[] = [
  {
    field: 'workDate',
    headerName: 'WorkDate',
    flex: 1,
    minWidth: 105,
  },
  {
    field: 'workStart',
    headerName: 'Start',
    type: 'dateTime',
    flex: 1,
    editable: true,
    valueFormatter: (params: GridValueFormatterParams) => {
      let format = params.value;
      if (format) {
        format = dayjs(params.value as Date).format('HH:mm:ss');
      }
      return format;
    }
  },
  {
    field: 'workEnd',
    headerName: 'End',
    type: 'dateTime',
    valueFormatter: (params) => {
      let format = params.value;
      if (format) {
        format = dayjs(params.value as Date).format('HH:mm:ss');
      }
      return format;
    },
    flex: 1,
    editable: true,
  },
  {
    field: 'rest',
    headerName: 'Rest',
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
  const { workStart, workEnd } = params.row;
  if (workStart && workEnd) {
    const startMmt = dayjs(workStart);
    const endMmt = dayjs(workEnd);
    const diff = endMmt.diff(startMmt);
    params.row.workTotal = diffFormat(diff, 'hh:mm:ss');
  }
  return params.row.workTotal;
}

function setWorkOver(params: GridValueGetterParams) {
  const { workStart, workEnd } = params.row;
  if (workStart && workEnd) {
    const baseMmt = dayjs(workStart).add(Const.BASIC_WORK_HOURS, 'hours');
    const endMmt = dayjs(workEnd);
    const diff = endMmt.diff(baseMmt);
    if (diff > 0) {
      params.row.workOver = diffFormat(diff, 'hh:mm:ss');
    }
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