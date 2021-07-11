import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Auth from './pages/Auth';
import Attendance from './pages/Attendance';
import { Const } from '../lib/commonUtil';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Const.PATH_NAME.auth} component={Login}/>;
        <Auth>
          <Switch>
            <Route path={Const.PATH_NAME.attendance} component={Attendance}/>
          </Switch>
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default App;