import { ServerConfig } from "../config/config";

/**
 * 共通定数
 */
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

/**
 * sessionStorage
 */
class Storage {
  StorageKey = {
    token: "token",
    userId: "userId"
  }

  get token(): string | null {
    return sessionStorage.getItem(this.StorageKey.token);
  }

  set token(value: string | null) {
    if (value) {
      sessionStorage.setItem(this.StorageKey.token, value);
    } else {
      sessionStorage.removeItem(this.StorageKey.token);
    }
  }

  get userId(): string | null {
    return sessionStorage.getItem(this.StorageKey.userId);
  }

  set userId(value: string | null) {
    if (value) {
      sessionStorage.setItem(this.StorageKey.userId, value);
    } else {
      sessionStorage.removeItem(this.StorageKey.userId);
    }
  }
}

export const storage = new Storage();