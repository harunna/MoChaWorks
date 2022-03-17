import * as React from 'react';
import { DataGrid, GridEventListener, GridEvents, GridRowId, MuiBaseEvent, MuiEvent } from '@mui/x-data-grid';
import { DataRowModel, getAttendanceList, GridData, postAttendance } from '../../../reducers/attendance';
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
  const [ editRow, setEditRow ] = useState<DataRowModel>({
    id: "",
    workDate: "",
    workStart: "",
    workEnd: "",
    workOver: "",
    workTotal: "",
    workPlace: ""
  })

  useEffect(() => {
    getAttendanceList(moment().format('yyyy-MM'));
  }, [getAttendanceList]);

  const onRowEditCommit = (id: GridRowId, event: MuiEvent<MuiBaseEvent>) => {
    const target = workingList.rows.find(row => row.id === id);
    if (!target) return;
    postAttendance({...target, ...editRow });
  }

  const onEditCellPropsChange: GridEventListener<GridEvents.editCellPropsChange> = (params, event) => {
    const { field, id, props } = params;
    let newState: any = {};
    newState[field] = props.value;
    newState.workDate = id;
    setEditRow({...editRow, ...newState});
  }

  return (
    <Container>
      <DataGrid
        classes={{ columnHeader: 'working-column-header' }}
        rows={workingList.rows}
        columns={workingList.columns}
        checkboxSelection={false}
        onRowEditCommit={onRowEditCommit}
        onEditCellPropsChange={onEditCellPropsChange}
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
`;
export default WorkingGrid;