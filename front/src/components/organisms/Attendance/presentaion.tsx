import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ClockBox from '../../molecules/ClockBox';
import CalendarPicker from '../../molecules/CalendarPicker';
import { ReactComponent as Setting } from '../../../assets/img/icons/icon-settings.svg';
import { ReactComponent as Export } from '../../../assets/img/icons/icon-export.svg';
import { AttendanceState } from '../../../reducers/attendance';
import * as attendanceActions from '../../../reducers/attendance';
import dayjs from 'dayjs';
import { Paper } from '@mui/material';
import { DataGrid, GridEditRowsModel, GridRowParams, MuiBaseEvent, MuiEvent } from '@mui/x-data-grid';

type Props = typeof attendanceActions & {
  attendanceState: AttendanceState;
}

function Attendance(props: Props) {
  const { postAttendance, getAttendanceList, attendanceState } = props;
  const { workingList  } = attendanceState;
  const [ editRowModel, setEditRowsModel] = useState<GridEditRowsModel>();

  useEffect(() => {
    getAttendanceList(dayjs().format('YYYY-MM'));
  }, [getAttendanceList]);

  const handleRowEditStop = (params: GridRowParams, event: MuiEvent<MuiBaseEvent>) => {
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

  const handleClickWorkButton = (current: dayjs.Dayjs) => {
    const todayRecord = workingList.rows.find(list => list.workDate === dayjs().format('YYYY-MM-DD'));
    if (!todayRecord) return;

    props.postAttendance({
      id: current.format('YYYY-MM-DD'),
      workDate: current.format('YYYY-MM-DD'),
      workStart: todayRecord.workStart,
      workEnd: todayRecord.workEnd,
      workOver: "",
      workTotal: "",
      workPlace: todayRecord.workPlace,
    })
  }

  const handleClickRestButton = (current: dayjs.Dayjs) => {}

  return (
    <Wrapper terminalCat="1">
      <BoxContainer>
        <ClockBox
          isWorkStart={false}
          isRestStart={false}
          handleClickWorkButton={handleClickWorkButton}
          handleClickRestButton={handleClickRestButton}
        />
      </BoxContainer>
      <WorkingGridContainer>
        <Caption>
          <CalendarPicker onChangeMonth={(value) => getAttendanceList(dayjs(value).format('YYYY-MM'))}/>
        </Caption>
        <ButtonGroup>
          <ExportButton />
          <SettingButton />
        </ButtonGroup>
        <Container>
          <DataGrid
            classes={{ columnHeader: 'working-column-header' }}
            rows={workingList.rows}
            columns={workingList.columns}
            checkboxSelection={false}
            onRowEditStop={handleRowEditStop}
            onEditRowsModelChange={onEditRowsModelChange}
            disableSelectionOnClick
            hideFooter
            showCellRightBorder
            headerHeight={35}
            rowHeight={32}
            editMode='row'
          />
        </Container>
      </WorkingGridContainer>
    </Wrapper>
  );
}

const WorkingGridContainer = styled(Paper)`
  margin: 0 auto;
  width: 1080px;
  padding: 20px 10px;
  background-color: #fff;
  box-sizing: border-box;
`;

const BoxContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 1080px;
`;

const Wrapper = styled.div<{ terminalCat: string }>`
  background-color: #f9f5e3;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  box-sizing: border-box;
  height: calc(100vh - 50px);
`;

const Container = styled.div`
  height: 472px;
  width: calc(100% - 30px);
  margin: 0 auto;
  .working-column-header {
    background-color: #2999AB;
    color: ${props => props.theme.color.WHITE};
  }
  .css-1062sh2-MuiDataGrid-root
  .MuiDataGrid-virtualScrollerContent--overflowed
  .MuiDataGrid-row--lastVisible
  .MuiDataGrid-cell {
    border-right-color: rgba(224, 224, 224, 1);
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

export default Attendance;