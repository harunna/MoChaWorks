import { GridColDef } from '@mui/x-data-grid';
import { Const } from '../../../lib/commonUtil';

export let WorkingGridColumns: GridColDef[] = [
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
    minWidth: 150
  },
  {
    field: 'workTotal',
    headerName: 'Total',
    minWidth: 150,
  },
  {
    field: 'workPlace',
    headerName: 'Place',
    editable: true,
    type: 'singleSelect',
    flex: 1,
    valueOptions: Const.WORKING_PLACE.map(working => {return { label: working.value, value: working.value }}),
  }
];