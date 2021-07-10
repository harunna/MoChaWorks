import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import styled from 'styled-components';
import { Const } from '../../../lib/commonUtil';
import { State as RootState } from "../../../reducers";
import { AwsToken } from '../../../reducers/auth';

interface Props {
  children: JSX.Element;
  token: AwsToken;
}

function Auth(props: Props) {
  const { token, children } = props;
  if (!token) {
    return <Redirect to={Const.PATH_NAME.auth} />;
  }
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
`;

const mapStateToProps = (state: RootState) => {
  return {
    token: state.auth.token
  }
}

const enhancer = connect(mapStateToProps);
export default enhancer(Auth);