import { ServerConfig } from "../config/config";

/**
 * 共通定数
 */
export namespace Const {
  export const APP_NAME = "MoChaWorks";
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
    value: number;
    label: string;
  }

  export const WORKING_PLACE: ComboBoxItem[] = [
    {value:1, label: "会社"},
    {value:2, label: "自宅"},
    {value:3, label: "自宅⇒会社"},
    {value:4, label: "会社⇒自宅"},
    {value:5, label: "客先1"},
    {value:6, label: "客先2"},
    {value:7, label: "客先3"},
    {value:8, label: "客先1⇒会社"},
    {value:9, label: "客先2⇒会社"},
    {value:10, label: "客先⇒会社"}
  ];

  export const BASIC_WORK_HOURS = 9;

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