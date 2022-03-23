import Component from './presentaion';
import * as attendanceActions from '../../../reducers/attendance';
import { getAttendanceList } from '../../../reducers/attendance';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { State as RootState } from "../../../reducers";

const mapStateToProps = (state: RootState) => {
  return {
    attendanceState: state.attendance
  }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({
      ...attendanceActions,
      getAttendanceList
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);