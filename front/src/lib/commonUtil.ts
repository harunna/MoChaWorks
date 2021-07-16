import { ServerConfig } from "../config/config";

export namespace Const {
  export const BASE_ROUTE = ServerConfig.BASE_ROUTE;
  export const PATH_NAME = {
    auth: "/auth",
    attendance: "/attendance"
  }

  // 端末区分
  export enum TerminalCat {
    pc = "1",
    iPad = "2",
    iPhone = "3"
  }

  export const AWS_SETTINGS = {
    region: 'ap-northeast-1',
    identityPoolId: 'ap-northeast-1:c6ab65fa-239d-4a99-ae8a-4f8658a9595b',
    userPoolId: 'ap-northeast-1_qBk2q0BxM',
    clientId: '4tu25ldrbbp63qopno880hvboa'
  }
}