import { GridColDef } from '@material-ui/data-grid';

export const WorkingGridColumns: GridColDef[] = [
  { 
    field: 'workDate',
    headerName: 'WorkDate',
    headerClassName: 'list-view-theme--header',
    width: 180,
  },
  {
    field: 'workStart',
    headerName: 'Start',
    headerClassName: 'list-view-theme--header',
    width: 180,
    editable: true,
  },
  {
    field: 'workEnd',
    headerName: 'End',
    headerClassName: 'list-view-theme--header',
    width: 150,
    editable: true,
  },
  {
    field: 'workOver',
    headerName: 'Over',
    headerClassName: 'list-view-theme--header',
    width: 150,
    editable: true,
  },
  {
    field: 'workTotal',
    headerName: 'Total',
    headerClassName: 'list-view-theme--header',
    width: 150,
  },
  {
    field: 'workPlace',
    headerName: 'Place',
    headerClassName: 'list-view-theme--header',
    width: 150,
    editable: true,
  },
];