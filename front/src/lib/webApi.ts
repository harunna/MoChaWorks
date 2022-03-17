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
    export const POST_ATTENDANCE_LIST: Endpoint = { url: "/list" }
    export const PUT_ATTENDANCE_LIST: Endpoint = { url: "/list" }
  }

  export function getAttendanceList(dispatch: Dispatch, params: AttendanceApi.Get.Request) {
    const { url } = Endpoints.GET_ATTENDANCE_LIST;
    const concatUrl = `${url}?userId=${params.userId}&month=${params.month}`;
    return get<{}, AttendanceApi.Get.Response[]>(dispatch, {}, concatUrl);
  }

  export function postAttendance(dispatch: Dispatch | null, params: AttendanceApi.Post.Request) {
    const { url } = Endpoints.POST_ATTENDANCE_LIST;
    const concatUrl = `${url}/${params.userId}/${params.workDate}`;
    return post<{}, AttendanceApi.Post.Response[]>(dispatch, params, concatUrl);
  }

  export function putAttendance(dispatch: Dispatch, params: AttendanceApi.Put.Request) {
    const { url } = Endpoints.POST_ATTENDANCE_LIST;
    const concatUrl = `${url}/${params.userId}/${params.workDate}`;
    return put<{}, AttendanceApi.Put.Response[]>(dispatch, params, concatUrl);
  }

  function get<P, R>(dispatch: Dispatch | null, params: P, url: string) {
    return sendRequest<R>('get', params,  url, dispatch);
  }

  function post<P, R>(dispatch: Dispatch | null, params: P, url: string) {
    return sendRequest<R>('post', params, url, dispatch);
  }

  function put<P, R>(dispatch: Dispatch | null, params: P, url: string) {
    return sendRequest<R>('put', params, url, dispatch);
  }

  /**
   * WebApi共通リクエスター
   * @param method 
   * @param url 
   * @param params 
   * @param dispatch 
   */
  function sendRequest<T>(
    method: 'post' | 'get' | 'put',
    params: {},
    url: string,
    dispatch: Dispatch| null, // 通知出力用
  ) {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      let requestData = {};
      let requestParams = {};

      if (method === 'post' || method === 'put') {
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
          console.log(response, 'response');
          console.log('正常終了');

          return resolve(response);
        })
        // ここで異常終了した場合の通知処理
        .catch((err: AxiosError) => {
          return reject(err);
        })
    })
  }
}