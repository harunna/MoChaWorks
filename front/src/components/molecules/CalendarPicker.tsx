import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import { ReactComponent as ArrowLeft } from '../../assets/img/icons/icon-arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/img/icons/icon-arrow-right.svg';
import moment from 'moment';
import { Modal } from '@mui/material';
import { DatePicker } from '@mui/lab';

type Props = {
  onChangeMonth?: (value: Date | null) => void;
}

function CalendarDatePicker(props: Props) {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [isOpenCalendar, setIsOpenCalendar] = React.useState<boolean>(false);
  const buttonRef = React.useRef(null);

  const onBackdropClick = () => {
    setIsOpenCalendar(false);
    onChangeMonth(value);
  }

  const onChangeMonth = (date: Date | null) => {
    if (value?.getMonth() !== date?.getMonth()) {
      setIsOpenCalendar(false);
      if (props.onChangeMonth) {
        props.onChangeMonth(date);
      }
    }
  }

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Button
          ref={buttonRef}
          onClick={() => setIsOpenCalendar(!isOpenCalendar)}
          sx={{ fontSize: '30px', fontWeight: 'bold', color: '#19778E' }}
        >
          {moment(value).format('yyyy MMM')}
        </Button>
        <Modal
          open={isOpenCalendar}
          onBackdropClick={onBackdropClick}
          BackdropProps={{ sx: { backgroundColor: 'transparent' }}}
        >
          <DatePicker
            views={['year', 'month']}
            open={true}
            PopperProps={{
              anchorEl: buttonRef.current
            }}
            openTo='month'
            value={value}
            onChange={(newValue) => setValue(newValue)}
            components={{
              LeftArrowIcon: ArrowLeft,
              RightArrowIcon: ArrowRight
            }}
            onMonthChange={(value) => onChangeMonth(value)}
            renderInput={() => (
              <></>
            )}
          />
        </Modal>
      </LocalizationProvider>
  );
}

export default CalendarDatePicker;