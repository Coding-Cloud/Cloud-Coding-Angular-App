import { HttpParams } from '@angular/common/http';

export class HttpTools {
  public static objectToHttpParams(
    params: any,
    httpParams = new HttpParams()
  ): HttpParams {
    Object.keys(params)
      .filter((key) => {
        const v = params[key];
        return Array.isArray(v) || typeof v === 'string'
          ? v.length > 0
          : v !== null && v !== undefined;
      })
      .forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    return httpParams;
  }

  public static valuesToHttpParams(
    key: string,
    values: any[],
    httpParams = new HttpParams()
  ): HttpParams {
    values.forEach((value) => (httpParams = httpParams.set(key, value)));
    return httpParams;
  }
}
