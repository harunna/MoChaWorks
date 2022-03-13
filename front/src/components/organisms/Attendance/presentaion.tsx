import React from 'react';
import styled from '@emotion/styled';
import ClockBox from '../../molecules/ClockBox';
import WorkingGrid from '../WorkingGrid';

function Attendance() {
  return (
    <Wrapper terminalCat="1">
      <BoxContainer>
        <ClockBox />
      </BoxContainer>
      <WorkingGridContainer>
        <WorkingGrid />
      </WorkingGridContainer>
    </Wrapper>
  );
}

const WorkingGridContainer = styled.div`
  margin: 0 auto;
  width: 1080px;
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

export default Attendance;