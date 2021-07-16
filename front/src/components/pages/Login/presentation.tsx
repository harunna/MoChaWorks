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
import { ReactComponent as HomeIcon } from '../../../assets/img/icons/icon-home.svg';

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
        <AppName className="font-effect-emboss">Take<AppIcon/>Mane</AppName>
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
  background-color: #A0D2CA;
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
`;

const StyledTextField = styled(InputBase)`
  margin-bottom: 20px;
  border: solid 1px;
  padding: 8px;
  border-color: #aaa;
  background-color: #fff;
  display: block;
  width: 250px;
  padding: 8px 8px 8px 20px;
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
  font-family: 'Open Sans',sans-serif;
  display: flex;
  align-items: inherit;
`;

const AppIcon = styled(HomeIcon)`
  width: 45px;
  height: 45px;
  margin: 0px 10px;
  fill: #025;
`;

const StyledButton = styled(Button)`
  background-color: #B8BCD2;
  font-weight: bold;
  color: #fff;
  width: 150px;
  height: 45px;

  &:hover {
    background-color: #025;
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