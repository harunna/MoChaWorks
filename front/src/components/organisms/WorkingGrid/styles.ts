import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    border: 0,
    fontFamily: 'inherit !important',
    '& .MuiDataGrid-columnHeader': {
      fontSize: '18px'
    },
    '& .list-view-theme--header': {
      backgroundColor: '#2999AB',
      color: '#fff',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: '1px solid rgba(224, 224, 224, 1)'
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
    '& .MuiDataGrid-cell': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1rem'
    },
    '& .MuiDataGrid-row:nth-child(odd)': {
      backgroundColor: '#E5F6F9'
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#BFC4DB'
    }
  },
});