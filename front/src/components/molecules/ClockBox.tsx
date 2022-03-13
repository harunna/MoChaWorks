import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as ClockIconSvg } from '../../assets/img/icons/icon-clock4.svg';
import moment from 'moment';
import { Button, Paper } from '@mui/material';

function ClockBox() {
  const [current, setCurrentTime] = useState(moment());

  const timerCallback = () => {
    setCurrentTime(moment());
  }
  
  useEffect(() => {
    const timer = setInterval(timerCallback, 1000);
    return () => clearInterval(timer);
  // @ts-ignore
  }, []);

  const curculateHourDeg = (): number => {
    const currentHour = current.hours();
    const currentMinute = current.minutes();
    const deg1hour = 360 / 12;
    const deg1minute = 15 / 60;
    return currentHour * deg1hour + currentMinute * deg1minute;
  }

  const curculateMinuteDeg = (): number => {
    const currentMinute = current.minute();
    const deg1minute = 360 / 60;
    return currentMinute * deg1minute;
  }

  return (
    <Wrapper>
      <BoxContent>
        <AnimateClockIcon hourDeg={curculateHourDeg()} minuteDeg={curculateMinuteDeg()} />
      </BoxContent>
      <BoxContent>
        <DateTimeText>{current.format('YYYY年MM月DD日')}</DateTimeText>
        <HourTimeText>{current.format('HH:mm:ss')}</HourTimeText>
      </BoxContent>
      <BoxContent>
        <WorkStartButton variant='contained'>Job Start!</WorkStartButton>
        <RestFinishButton variant="contained">Rest Start!</RestFinishButton>
      </BoxContent>
    </Wrapper>
  )
}

const Wrapper = styled(Paper)`
  border-radius: 2px;
  padding: 10px 10px;
  width: 100%;
  height: 220px;
  vertical-align: middle;
  background-color: #2999AB;
  display: flex;
  align-items: center;
`;

const BaseControlButton = styled(Button)`
  display: block;
  min-width: 170px;
  min-height: 60px;
  font-size: 16px;
  
  &:first-child {
    margin-bottom: 10px;
  }
`;

const AnimateClockIcon = styled(ClockIconSvg)<{ hourDeg: number; minuteDeg: number }>`
  width: 220px;
  height: 125px;
  .hour-hand { transform: rotate(${({ hourDeg }) => `${hourDeg}deg`}); }
  .minute-hand { transform: rotate(${({ minuteDeg }) => `${minuteDeg}deg`}); }
`;

const WorkStartButton = styled(BaseControlButton)`
  background-color: #f9b118;
`;
const RestFinishButton = styled(BaseControlButton)`
  background-color: #14cc5e;
`;

const BoxContent = styled.div`
  font-size: 34px;
  color: white;
  font-family: inherit;
  &:nth-child(1) { flex: 1; }
  &:nth-child(2) { flex: 3; }
  &:nth-child(3) { flex: 1; }
`;

const DateTimeText = styled.div`
  font-size: 20px;
`;

const HourTimeText = styled.div`
  font-size: 40px;
`;

export default ClockBox;