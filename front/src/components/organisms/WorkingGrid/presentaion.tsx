import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DataGrid, GridColDef, GridRowId } from '@material-ui/data-grid';
import { Paper } from '@material-ui/core';
import { WorkingGridColumns } from './columns';
import { ReactComponent as Setting } from '../../../assets/img/icons/icon-settings.svg';
import { ReactComponent as ArrowLeft } from '../../../assets/img/icons/icon-arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../assets/img/icons/icon-arrow-right.svg';
import { ReactComponent as Export } from '../../../assets/img/icons/icon-export.svg';
import { getAttendanceList } from '../../../reducers/attendance';
import { useStyles } from './styles';

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

type Props = {
  attendanceList: AttendanceApi.Get.Response[];
  getAttendanceList: typeof getAttendanceList;
}

function WorkingTable(props: Props) {
  const classes = useStyles();
  const { getAttendanceList, attendanceList } = props;
  const [ attendanceRows, setAttendanceRows ] = React.useState<GridData>({ columns: [], rows: [] });

  useEffect(() => {
    getAttendanceList('2021-05');
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
        <ArrowLeft />Works<span>July</span>2021<ArrowRight />
      </Caption>
      <ButtonGroup><Export /><Setting /></ButtonGroup>
      <DataGrid
        {...attendanceRows}
        className={classes.root}
        pageSize={31}
        rowHeight={32}
        headerHeight={30}
        checkboxSelection={false}
        hideFooter
        disableSelectionOnClick
        disableColumnMenu
      />
    </Wrapper>
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

const Wrapper = styled(Paper)`
  height: 800px;
  width: 1100px;
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