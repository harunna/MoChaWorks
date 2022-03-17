import React from 'react';
import styled from '@emotion/styled';
import ClockBox from '../../molecules/ClockBox';
import WorkingGrid from '../WorkingGrid';
import CalendarPicker from '../../molecules/CalendarPicker';
import { ReactComponent as Setting } from '../../../assets/img/icons/icon-settings.svg';
import { ReactComponent as Export } from '../../../assets/img/icons/icon-export.svg';
import { getAttendanceList } from '../../../reducers/attendance';
import moment from 'moment';
import { Paper } from '@mui/material';

function Attendance() {
  return (
    <Wrapper terminalCat="1">
      <BoxContainer>
        <ClockBox />
      </BoxContainer>
      <WorkingGridContainer>
        <Caption>
          <CalendarPicker
            onChangeMonth={(value) => getAttendanceList(moment(value).format('yyyy-MM'))}
          />
        </Caption>
        <ButtonGroup>
          <ExportButton />
          <SettingButton />
        </ButtonGroup>
        <WorkingGrid />
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