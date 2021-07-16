import * as React from 'react';
import styled from 'styled-components';
import { Const } from '../../../lib/commonUtil';
import WorkingGrid from '../WorkingGrid';
import TodayWorks from '../../molecules/TodayWorks';
import { useEffect } from 'react';

function Attendance() {
  useEffect(() => {
    
  // @ts-ignore
  }, []);

  return (
    <Wrapper terminalCat="1">
      <TodayWorks />
        <WorkingGrid />
      <TodayWorks />
    </Wrapper>
  );
}

const Wrapper = styled.div<{terminalCat: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.SECONDRY};
  height: calc(100vh - ${props => ({ terminalCat }) => 
  terminalCat === Const.TerminalCat.pc ? 
    props.theme.layout.header.default : 
      terminalCat === Const.TerminalCat.iPad ? 
        props.theme.layout.header.tablet :
          props.theme.layout.header.mobile});
`;

export default Attendance;