import * as React from 'react';
import { DataGrid, GridEditRowsModel, GridRowParams, MuiBaseEvent, MuiEvent } from '@mui/x-data-grid';
import { getAttendanceList, GridData, postAttendance } from '../../../reducers/attendance';
import styled from '@emotion/styled';
import moment from 'moment';
import { useEffect, useState } from 'react';

type Props = {
  workingList: GridData;
  getAttendanceList: typeof getAttendanceList;
  postAttendance: typeof postAttendance;
}

function WorkingGrid(props: Props) {
  const { workingList, getAttendanceList, postAttendance } = props;
  const [ editRowModel, setEditRowsModel] = useState<GridEditRowsModel>();

  useEffect(() => {
    getAttendanceList(moment().format('yyyy-MM'));
  }, [getAttendanceList]);

  const onRowEditStop = (params: GridRowParams, event: MuiEvent<MuiBaseEvent>) => {
    if (editRowModel) {
      postAttendance({
        id: params.id,
        workDate: params.row.workDate,
        workStart: editRowModel[params.id].workStart.value as string,
        workEnd: editRowModel[params.id].workEnd.value as string,
        workOver: "",
        workTotal: "",
        workPlace: editRowModel[params.id].workPlace.value as string,
      })
    }
  }

  const onEditRowsModelChange = React.useCallback((model: GridEditRowsModel) => {
    setEditRowsModel(model);
  }, []);

  return (
    <Container>
      <DataGrid
        classes={{ columnHeader: 'working-column-header' }}
        rows={workingList.rows}
        columns={workingList.columns}
        checkboxSelection={false}
        onRowEditStop={onRowEditStop}
        onEditRowsModelChange={onEditRowsModelChange}
        disableSelectionOnClick
        hideFooter
        showCellRightBorder
        headerHeight={35}
        rowHeight={32}
        editMode='row'
      />
    </Container>
  );
}

const Container = styled.div`
  height: 472px;
  width: calc(100% - 30px);
  margin: 0 auto;
  .working-column-header {
    background-color: #AAA;
    color: ${props => props.theme.color.WHITE};
  }
  .css-1062sh2-MuiDataGrid-root
  .MuiDataGrid-virtualScrollerContent--overflowed
  .MuiDataGrid-row--lastVisible
  .MuiDataGrid-cell {
    border-right-color: rgba(224, 224, 224, 1);
  }
`;
export default WorkingGrid;