import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as ClockIconSvg } from '../../assets/img/icons/icon-clock.svg';
import moment from 'moment';
import { Button, Paper } from '@mui/material';

type Props = {
  isWorkStart: boolean;
  isRestStart: boolean;
  handleClickWorkButton: (current: moment.Moment) => void;
  handleClickRestButton: (current: moment.Moment) => void;
}

function ClockBox(props: Props) {
  const { handleClickWorkButton, handleClickRestButton } = props;
  const [current, setCurrentTime] = useState<moment.Moment>(moment());

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
    const deg1minute = 30 / 60;
    return currentHour * deg1hour + currentMinute * deg1minute;
  }

  const curculateMinuteDeg = (): number => {
    const currentMinute = current.minute();
    const deg1minute = 360 / 60;
    return currentMinute * deg1minute;
  }

  const onClickWorkButton = () => {
    handleClickWorkButton(current);
  }

  const onClickRestButton = () => {
    handleClickRestButton(current);
  }

  return (
    <Wrapper>
      <BoxContent>
        <AnimateClockIcon hourdeg={curculateHourDeg()} minutedeg={curculateMinuteDeg()} />
      </BoxContent>
      <BoxContent>
        <DateTimeText>{current.format('YYYY年MM月DD日')}</DateTimeText>
        <HourTimeText>{current.format('HH:mm:ss')}</HourTimeText>
      </BoxContent>
      <BoxContent>
        <ButtonWrapper>
          <WorkButton onClick={onClickWorkButton} variant='contained'>Work Start</WorkButton>
          <WorkButton onClick={onClickWorkButton} variant='contained'>Work End</WorkButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <RestButton onClick={onClickRestButton} variant="contained">Rest Start</RestButton>
          <RestButton onClick={onClickRestButton} variant="contained">Rest End</RestButton>
        </ButtonWrapper>
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

const AnimateClockIcon = styled(ClockIconSvg)<{ hourdeg: number; minutedeg: number }>`
  width: 220px;
  height: 125px;
  .hour-hand { transform: rotate(${({ hourdeg }) => `${hourdeg}deg`}); }
  .minute-hand { transform: rotate(${({ minutedeg }) => `${minutedeg}deg`}); }
`;

const BoxContent = styled.div`
  font-size: 34px;
  color: white;
  padding-right: 40px;
  &:nth-of-type(1) { flex: 1; }
  &:nth-of-type(2) { flex: 3; }
  &:nth-of-type(3) { flex: 1; }
`;

const BaseControlButton = styled(Button)`
  display: block;
  min-width: 170px;
  min-height: 60px;
  font-size: 16px;
`;

const WorkButton = styled(BaseControlButton)`
  background-color: #f9b118;
  &:hover {
    background-color: #f9b118;
  }
  &:first-of-type {
    margin-right: 15px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  &:first-of-type {
    margin-bottom: 10px;
  }
`;

const RestButton = styled(BaseControlButton)`
  background-color: #14cc5e;
  &:hover {
    background-color: #14cc5e;
  }

  &:first-of-type {
    margin-right: 15px;
  }
`;

const DateTimeText = styled.div`
  font-size: 20px;
`;

const HourTimeText = styled.div`
  font-size: 40px;
`;

export default ClockBox;