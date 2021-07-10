import * as AWS from 'aws-sdk';
import * as cognito from 'amazon-cognito-identity-js';
import { Const } from '../lib/commonUtil';
import { CognitoResponse } from '../lib/types/cognitoResponse';

AWS.config.region = Const.AWS_SETTINGS.region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: Const.AWS_SETTINGS.identityPoolId,
});
const userPool = new cognito.CognitoUserPool({
  UserPoolId: Const.AWS_SETTINGS.userPoolId,
  ClientId: Const.AWS_SETTINGS.clientId,
});

/**
 * サインアップ処理
 * 試しに作ってみただけ
 */
export const signUp = (): void => {
  const userName = 'adminUser';
  const password = 'Password1234';
  const attributeList:Array<any> = [
    {
      "Name": "email",
      "Value": ""
    }
  ];
  userPool.signUp(userName, password, attributeList, [], (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
};

/**
 * サインイン処理
 * @param userName ユーザー名 
 * @param password パスワード
 * @returns        トークン
 */
export const signIn = async (userName: string, password: string): Promise<CognitoResponse> => {
  const auth = new cognito.AuthenticationDetails({
    Username: userName,
    Password: password,
  });
  
  const userData = {
    Username: userName,
    Pool: userPool,
  };

  const user = new cognito.CognitoUser(userData);

  return signInByPromise(user, auth)
    .then((response) => response)
    .catch((error) => error);
}

async function signInByPromise(user: cognito.CognitoUser, auth: cognito.AuthenticationDetails): Promise<CognitoResponse> {
  return new Promise((resolve, rejects) => {
    user.authenticateUser(auth, {
      onSuccess: function (result) {
        const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.getIdToken();
        resolve({ accessToken, idToken })
      },
      onFailure: (err) => {
        rejects(err);
      }
    });
  })
}
export default { signUp, signIn };