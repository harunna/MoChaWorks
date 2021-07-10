import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { InputBase, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { State as RootState } from "../../../reducers";
import { bindActionCreators, Dispatch } from 'redux';
import { AuthState, login } from '../../../reducers/auth';
import { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Const } from '../../../lib/commonUtil';

type Props = RouteComponentProps<{}> & {
  login: typeof login;
  auth: AuthState;
}

function Login(props: Props) {
  const { history, auth } = props;
  const { token } = auth;
  const [userId, inputUserId] = useState("");
  const [password, inputPassword] = useState("");

  const handleChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
    inputUserId(e.target.value);
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    inputPassword(e.target.value);
  }

  const handleClickLogin = () => {
    props.login(userId, password);
  }

  useEffect(() => {
    if (token) {
      history.push(Const.PATH_NAME.attendance);
    }
  }, [token, history])

  return (
    <Wrapper>
      <Contents>
        <h1>TAKE NO MANAGEMENT</h1>
        <FormWrap>
          <StyledTextField placeholder="UserName" onChange={handleChangeUserId}/>
          <StyledTextField placeholder="Password" onChange={handleChangePassword} type="password"/>
        </FormWrap>
        <StyledButton onClick={handleClickLogin} disabled={userId === "" || password === ""}>
          Login
        </StyledButton>
      </Contents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #F1F18D;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  > h1 {
    color: #707070;
    margin-top: 0px;
    font-weight: 400;
    margin-bottom: 100px;
  }
`;

const StyledTextField = styled(InputBase)`
  margin-bottom: 20px;
  border: solid 1px;
  padding: 8px;
  border-color: #aaa;
  background-color: #fff;
  display: block;
  width: 250px;
`;

const FormWrap = styled.div`
  margin-bottom: 40px;
`;

const StyledButton = styled(Button)`
  background-color: #B8BCD2;
  color: #fff;
  width: 150px;
  height: 45px;

  &:hover {
    background-color: #000;
  }
`;

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({
      login
    },
    dispatch)
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(enhancer(Login));