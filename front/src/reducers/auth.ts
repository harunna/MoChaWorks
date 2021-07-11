import { CognitoResponse } from "../lib/types/cognitoResponse";
import { signIn } from "../service/login";

// Action Creator
type ThunkAction<A> = (dispatch: (a: A) => void | Promise<void>) => void | Promise<void>;

export type AwsToken = CognitoResponse | null;
export interface AuthState {
  token: AwsToken;
}

export interface authSuccessAction {
  type: 'ACCOUNT__AUTH_SUCCESS',
  payload: {
    value: CognitoResponse
  }
}

function authSuccess(token: CognitoResponse): authSuccessAction {
  return {
    type: 'ACCOUNT__AUTH_SUCCESS',
    payload: {
      value: token
    }
  }
}

const initialState: AuthState = {
  token: null
}

export function login(userName: string, password: string): ThunkAction<authSuccessAction> {
  return async (dispatch) => {
    try {
      const response: CognitoResponse = await signIn(userName, password);
      dispatch(authSuccess(response));
    } catch(e) {
      console.log(e);
    }
  }
}

type Action = authSuccessAction;

export default (state: AuthState = initialState, action: Action): AuthState => {
  switch(action.type) {
    case 'ACCOUNT__AUTH_SUCCESS':
      return { ...state, token: action.payload.value };

    default:
      return state;
  }
}