import { GridColDef } from '@mui/x-data-grid';
import { Button } from 'aws-sdk/clients/lexruntime';
import { Const } from '../../../lib/commonUtil';
import  SelectBox from '../../atoms/SelectBox';

export const WorkingGridColumns: GridColDef[] = [
  { 
    field: 'workDate',
    headerName: 'WorkDate',
    minWidth: 180,
  },
  {
    field: 'workStart',
    headerName: 'Start',
    minWidth: 180,
    editable: true,
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
    editable: true,
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
    // valueOptions: Const.WORKING_PLACE.map(working => {return { label: working.value, value: working.value }}),
  }
];