import React, { createContext } from 'react';
import { Redirect } from "react-router-dom";
import { Const, storage } from '../../../lib/commonUtil';

interface Props {
  children: JSX.Element;
}

const ThemeContext = createContext('light');

function Auth(props: Props) {
  const { children } = props;
  if (!storage.token) {
    return <Redirect to={Const.PATH_NAME.auth} />;
  }
  return (
    <ThemeContext.Provider value="dark">
      {children}
    </ThemeContext.Provider>
  );
}

export default Auth;