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

  export interface ComboBoxItem {
    id: number;
    value: string;
  }

  export const WORKING_PLACE: ComboBoxItem[] = [
    {id:1, value: "会社"},
    {id:2, value: "自宅"},
    {id:3, value: "自宅⇒会社"},
    {id:4, value: "会社⇒自宅"},
    {id:5, value: "客先1"},
    {id:6, value: "客先2"},
    {id:7, value: "客先3"},
    {id:8, value: "客先1⇒会社"},
    {id:9, value: "客先2⇒会社"},
    {id:10, value: "客先3⇒会社"}
  ]

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