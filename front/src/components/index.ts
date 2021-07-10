import { connect } from "react-redux";
import { State as RootState } from "../reducers";
import { AuthState } from "../reducers/auth";
import App from "./App";

interface Props {
  auth: AuthState;
}

const mapStateToProps = (state: RootState): Props => {
  return {
    auth: state.auth
  };
};

const enhancer = connect(
  mapStateToProps
);

export default enhancer(App);