import React, { createContext } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Const } from '../../../lib/commonUtil';
import { State as RootState } from "../../../reducers";
import { AwsToken } from '../../../reducers/auth';

interface Props {
  children: JSX.Element;
  token: AwsToken;
}

const ThemeContext = createContext('light');

function Auth(props: Props) {
  const { token, children } = props;
  if (!token) {
    return <Redirect to={Const.PATH_NAME.auth} />;
  }
  return (
    <ThemeContext.Provider value="dark">
      {children}
    </ThemeContext.Provider>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    token: state.auth.token
  }
}

const enhancer = connect(mapStateToProps);
export default enhancer(Auth);