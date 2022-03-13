import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { Const } from '../../../lib/commonUtil';
import { ReactComponent as Setting } from '../../../assets/img/icons/icon-settings.svg';
import { ReactComponent as Export } from '../../../assets/img/icons/icon-export.svg';
import { getAttendanceList } from '../../../reducers/attendance';
import CalendarPicker from '../../molecules/CalendarPicker';
import { useStyles } from './styles';
import moment from 'moment';
import { Paper } from '@mui/material';

export type DataRowModel = {
  id: GridRowId;
  workDate: string;
  workStart: string;
  workEnd: string;
  workOver: string;
  workTotal: string;
  workPlace: string;
}

export interface GridData {
  columns: GridColDef[];
  rows: DataRowModel[];
}

export const WorkingGridColumns: GridColDef[] = [
  { 
    field: 'workDate',
    headerName: 'WorkDate',
    headerClassName: 'list-view-theme--header',
    minWidth: 180,
  },
  {
    field: 'workStart',
    headerName: 'Start',
    headerClassName: 'list-view-theme--header',
    minWidth: 180,
    editable: true,
  },
  {
    field: 'workEnd',
    headerName: 'End',
    headerClassName: 'list-view-theme--header',
    minWidth: 150,
    editable: true,
  },
  {
    field: 'workOver',
    headerName: 'Over',
    headerClassName: 'list-view-theme--header',
    minWidth: 150,
    editable: true,
  },
  {
    field: 'workTotal',
    headerName: 'Total',
    headerClassName: 'list-view-theme--header',
    minWidth: 150,
  },
  {
    field: 'workPlace',
    headerName: 'Place',
    headerClassName: 'list-view-theme--header',
    editable: true,
    type: 'singleSelect',
    valueOptions: Const.WORKING_PLACE.map(working => {return { label: working.value, value: working.value }}),
  }
];

type Props = {
  attendanceList: AttendanceApi.Get.Response[];
  getAttendanceList: typeof getAttendanceList;
}

function WorkingTable(props: Props) {
  const { attendanceList, getAttendanceList } = props;
  const [ attendanceRows, setAttendanceRows ] = React.useState<GridData>({ columns: [], rows: [] });

  useEffect(() => {
    getAttendanceList(moment().format('yyyy-MM'));
  }, [getAttendanceList]);

  useEffect(() => {
    setAttendanceRows({
      columns: WorkingGridColumns,
      rows: attendanceList.map((list, index) => {
        return {
          id: `${list.user_id}_${index}`,
          workDate: list.work_date,
          workStart: list.work_record.start,
          workEnd: list.work_record.end,
          workOver: list.overtime,
          workTotal: list.total,
          workPlace: list.work_record.place
        }
      })
    });
  }, [attendanceList]);

  return (
    <Wrapper>
      <Caption>
        <CalendarPicker onBackdropClick={(value) => getAttendanceList(moment(value).format('yyyy-MM'))} />
      </Caption>
      <ButtonGroup>
        <ExportButton />
        <SettingButton />
      </ButtonGroup>
      <DataGridContainer>
        <DataGrid
          {...attendanceRows}
          rowCount={attendanceList.length}
          className={useStyles().root}
          rowHeight={32}
          headerHeight={30}
          checkboxSelection={false}
          hideFooter
          disableSelectionOnClick
          disableColumnMenu
          showCellRightBorder
          showColumnRightBorder
          editMode='row'
        />
      </DataGridContainer>
    </Wrapper>
  );
}

const Wrapper = styled(Paper)({
  borderRadius: '2px',
  padding: '10px 10px',
  width: '100%',
  boxSizing: 'border-box',
  height: '600px'
})

const DataGridContainer = styled.div`
  width: 100%;
  height: calc(100% - 130px);
  .last-column {
    min-width: 100%;
  }
`;

const Caption = styled.div`
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  padding-right: 10px;
  > svg {
    fill: #797B87;
  }
`;

const ExportButton = styled(Export)`
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;

const SettingButton = styled(Setting)`
  width: 40px;
  height: 40px;
`;

export default WorkingTable;