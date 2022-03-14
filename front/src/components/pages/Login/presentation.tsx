import React, { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { InputBase, Button } from '@mui/material';
import { connect } from 'react-redux';
import { State as RootState } from "../../../reducers";
import { bindActionCreators, Dispatch } from 'redux';
import { login } from '../../../reducers/auth';
import { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Const } from '../../../lib/commonUtil';
import { ReactComponent as HomeIcon } from '../../../assets/img/icons/icon-home.svg';

type Props = RouteComponentProps<{}> & {
  login: typeof login;
  token: string;
}

function Login(props: Props) {
  const { history, token } = props;
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
        <AppName className="font-effect-emboss">{Const.APP_NAME}</AppName>
        <FormWrap>
          <TextField placeholder="UserName" onChange={handleChangeUserId} sx={{'&::placeholder': { fontWeight: 'bold'}}}/>
          <TextField placeholder="Password" onChange={handleChangePassword} type="password"/>
        </FormWrap>
        <LoginButton onClick={handleClickLogin} disabled={userId === "" || password === ""}>
          Login
        </LoginButton>
      </Contents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #A0D2CA;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  padding: 75px 120px;
  background-color: rgba(255,255,255,0.2);
  border: solid #fff 2px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextField = styled(InputBase)`
  margin-bottom: 20px;
  border: solid 1px;
  padding: 8px;
  border-color: #aaa;
  background-color: ${props => props.theme.color.WHITE};
  display: block;
  width: 250px;
  padding: 8px 8px 8px 20px;
  font-size: 20px;
`;

const FormWrap = styled.div`
  margin-bottom: 40px;
`;

const AppName = styled.h1`
  color: ${props => props.theme.color.WHITE};
  margin-top: 0px;
  font-weight: bold;
  margin-bottom: 100px;
  font-size: 45px;
  display: flex;
`;

const LoginButton = styled(Button)`
  background-color: #DA1;
  font-weight: bold;
  color: #fff;
  width: 150px;
  height: 45px;
  &:hover {
    background-color: #DA1;
  }
  &:disabled {
    background-color: #B8BCD2;
  }
`;

const mapStateToProps = (state: RootState) => {
  return {
    token: state.auth.jwtToken
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