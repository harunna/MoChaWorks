import * as React from 'react';
import styled from 'styled-components';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, Paper } from '@material-ui/core';
import { Columns } from './columns';
import { ReactComponent as Setting } from '../../../assets/img/icons/icon-settings.svg';
import { ReactComponent as ArrowLeft } from '../../../assets/img/icons/icon-arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../assets/img/icons/icon-arrow-right.svg';
import { ReactComponent as Export } from '../../../assets/img/icons/icon-export.svg';

const rows = [
  { id: 1, workDate: '2021-07-01', workStart: '09:01:00', workEnd: '18:30:00', workOver: "", workTotal: "", workPlace: '本社' },
  { id: 2, workDate: '2021-07-02', workStart: '09:01:00', workEnd: '18:30:00', workOver: "", workTotal: "",  workPlace: '自宅' },
  { id: 3, workDate: '2021-07-03', workStart: '09:01:00', workEnd: '18:30:00', workOver: "", workTotal: "",  workPlace: '本社' },
  { id: 4, workDate: '2021-07-04', workStart: '09:01:00', workEnd: '18:30:00', workOver: "", workTotal: "",  workPlace: '自宅' },
  { id: 5, workDate: '2021-07-05', workStart: '09:01:00', workEnd: '18:30:00', workOver: "", workTotal: "",  workPlace: '本社' },
  { id: 6, workDate: '2021-07-06', workStart: '09:01:00', workEnd: '18:30:00', workOver: "", workTotal: "",  workPlace: '本社' },
  { id: 7, workDate: '2021-07-07', workStart: '09:01:00', workEnd: '18:30:00', workOver: "", workTotal: "",  workPlace: '本社' },
  { id: 8, workDate: '2021-07-08', workStart: '09:01:00', workEnd: '18:30:00', workOver: "", workTotal: "",  workPlace: '本社' },
];

const useStyles = makeStyles({
  root: {
    border: 0,
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
      alignItems: 'center'
    },
    '& .MuiDataGrid-row:nth-child(odd)': {
      backgroundColor: '#E5F6F9'
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#BFC4DB'
    }
  },
});

function WorkingTable() {
  const classes = useStyles();
  return (
    <GridContainer>
      <Caption>
        <ArrowLeft />Works<span>July</span>2021<ArrowRight />
      </Caption>
      <ButtonGroup><Export /><Setting /></ButtonGroup>
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={Columns}
        pageSize={31}
        rowHeight={32}
        headerHeight={30}
        checkboxSelection={false}
        hideFooter
        disableSelectionOnClick
        disableColumnMenu
      />
    </GridContainer>
  );
}

const Caption = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #61667D;
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    fill: #61667D;
    margin: 0 20px;
  }

  > span {
    margin: 0 15px;
    color: #2999AB;
  }
`;

const GridContainer = styled(Paper)`
  height: 600px;
  width: 900px;
  border-radius: 10px;
  background-color: ${props => props.theme.color.WHITE};
  padding: 10px 10px 0px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  > svg {
    fill: #797B87;
  }
`;

export default WorkingTable;