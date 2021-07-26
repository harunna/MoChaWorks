import axios, { AxiosResponse, AxiosError } from 'axios'; 
import { ServerConfig } from "../config/config";

export class ApiError implements Error {
  public name = "Api Error";
  constructor(public message: string, public response: AxiosResponse | null) {}
}

export namespace WebApi {
  type Dispatch = (a: any) => void | Promise<any>

  type Endpoint = {
    url: string;
  }

  namespace Endpoints {
    export const GET_ATTENDANCE_LIST: Endpoint = { url: "/list" }
  }

  export function getAttendanceList(dispatch: Dispatch, params: AttendanceApi.Get.Request) {
    const { url } = Endpoints.GET_ATTENDANCE_LIST;
    const concatUrl = `${url}/${params.user_id}/${params.work_date}`;
    console.log(concatUrl);
    return get<{}, AttendanceApi.Get.Response[]>(dispatch, {}, concatUrl);
  }

  function get<P, R>(dispatch: Dispatch, params: P, url: string) {
    return sendRequest<R>('get', params,  url, dispatch);
  }

  // function post<P, R>(dispatch: Dispatch, params: P, url: string) {
  //   return sendRequest<R>('post', params, url, dispatch);
  // }

  /**
   * WebApi共通リクエスター
   * @param method 
   * @param url 
   * @param params 
   * @param dispatch 
   */
  function sendRequest<T>(
    method: 'post' | 'get',
    params: {},
    url: string,
    dispatch: Dispatch| null,
  ) {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      let requestData = {};
      let requestParams = {};

      if (method === 'post') {
        requestData = params;
      } else {
        requestParams = params
      }

      const config = {
        method: method,
        data: requestData,
        param: requestParams,
        url: ServerConfig.API_SERVER + url
      }

      const sleepByPromise = (milSec: number) => {
        return new Promise(resolve => setTimeout(resolve, milSec));
      }

      const sleepRequest = async (milSec: number): Promise<AxiosResponse> => {
        await sleepByPromise(milSec);
        return axios.request(config);
      }

      return axios.request(config)
        .catch(() => sleepRequest(500))
        .catch(() => sleepRequest(1000))
        // 通信エラー系のエラーハンドリング
        .catch((err: AxiosError) => {
          if (err.response) {
            throw new ApiError('ERROR_API_SERVER_BUSY', err.response);
          }
          throw new ApiError('ERROR_NETWORK', null);
        })
        .then((response) => {
          switch(response.status) {
            case 200:
              return response;
            case 400:
              throw new ApiError('ERROR BAD REQUEST', response);
            case 401:
              throw new ApiError('ERROR UNAUTHORIZED', response);
            default:
              throw new ApiError('ERROR_API_SERVER UNKNOWN', response);
          }
        })
        // ここで正常終了した場合の通知処理
        .then((response) => {
          return resolve(response);
        })
        // ここで異常終了した場合の通知処理
        .catch((err: AxiosError) => {
          return reject(err);
        })
    })
  }
}