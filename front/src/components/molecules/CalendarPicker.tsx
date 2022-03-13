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
  onBackdropClick?: (value: Date | null) => void;
}

function CalendarDatePicker(props: Props) {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [isOpenCalendar, setIsOpenCalendar] = React.useState<boolean>(false);
  const buttonRef = React.useRef(null);

  const onBackdropClick = () => {
    setIsOpenCalendar(false);
    if (props.onBackdropClick) {
      props.onBackdropClick(value);
    }
  }

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Button onClick={() => setIsOpenCalendar(!isOpenCalendar)} ref={buttonRef} sx={{ fontSize: '30px', fontFamily: 'inherit', fontWeight: 'bold' }}>
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
            renderInput={() => (
              <></>
            )}
          />
        </Modal>
      </LocalizationProvider>
  );
}

export default CalendarDatePicker;