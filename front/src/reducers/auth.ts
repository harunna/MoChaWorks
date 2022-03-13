import { storage } from "../lib/commonUtil";
import { CognitoResponse } from "../lib/types/cognitoResponse";
import { signIn } from "../service/login";
// import { signIn } from "../service/login";

// Action Creator
type ThunkAction<A> = (dispatch: (a: A) => void | Promise<void>) => void | Promise<void>;

export type AwsToken = CognitoResponse | null;
export interface AuthState {
  userId: string;
  jwtToken: string;
}

export interface authSuccessAction {
  type: 'ACCOUNT__AUTH_SUCCESS',
  payload: {
    userId: string,
    jwtToken: string
  }
}

function authSuccess(token: CognitoResponse): authSuccessAction {
  console.log(token);
  const userId = token.idToken.payload["cognito:username"];
  const jwtToken = token.idToken.jwtToken;

  // sessionStorageにjwtTokenを保存
  storage.userId = userId;
  storage.token = jwtToken;
  
  return {
    type: 'ACCOUNT__AUTH_SUCCESS',
    payload: {
      userId: userId,
      jwtToken: jwtToken
    }
  }
}

// const devAuth: AuthState = {
//   userId: "haru3",
//   jwtToken: "aaa"
// }

const initialState: AuthState = {
  userId: "",
  jwtToken: "",
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
      return {
        ...state,
        userId: action.payload.userId,
        jwtToken: action.payload.jwtToken
      };

    default:
      return state;
  }
}