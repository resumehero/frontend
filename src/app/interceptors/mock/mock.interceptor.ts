import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '@misc/constants/app-config.constant';
import { tokensResponses } from '@interceptors/mock/responses/token.responses';
import { usersResponses } from '@interceptors/mock/responses/users.responses';

interface IMockHandler {
  handler(...params: any[]): Observable<HttpResponse<any>>;
}

interface IEndpointMock {
  [key: string]: IMockHandler;
}

interface IMockEndpoints {
  GET?: IEndpointMock;
  PATCH?: IEndpointMock;
  POST?: IEndpointMock;
  PUT?: IEndpointMock;
  DELETE?: IEndpointMock;
}

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  private _config: IAppConfig = inject<IAppConfig>(APP_CONFIG);
  endpoints: IMockEndpoints;

  constructor() {
    this.endpoints = {
      GET: {
        [`${this._config.apiUrl}/api/users`]: { handler: usersResponses.list },
        [`${this._config.apiUrl}/api/users/:id`]: { handler: usersResponses.oneById }
      },
      POST: {
        [`${this._config.apiUrl}/oauth/token`]: { handler: tokensResponses.accessToken },
        [`${this._config.apiUrl}/api/users`]: { handler: usersResponses.create }
      },
      PATCH: {
        [`${this._config.apiUrl}/api/users/:id`]: { handler: usersResponses.update }
      },
      PUT: {
        [`${this._config.apiUrl}/api/users/:id`]: { handler: usersResponses.update }
      },
      DELETE: {
        [`${this._config.apiUrl}/api/users/:id`]: { handler: usersResponses.delete }
      }
    };
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const endpoint: { params: string[]; path: string } | null = this._getEndpoint(request);
    const currentMockEndpoint: IMockHandler | undefined =
      this.endpoints?.[request.method as keyof IMockEndpoints]?.[request.url] ??
      this.endpoints?.[request.method as keyof IMockEndpoints]?.[endpoint?.path as string];

    if (currentMockEndpoint) {
      console.warn('Intercepted by API mock service: ', endpoint);
      console.warn('\tRequest headers: ', request?.headers);
      console.warn('\tRequest body: ', request?.body);
      console.warn('\tRequest Query params: ', request?.params);
    }

    return timer(300).pipe(
      mergeMap(
        (): Observable<HttpEvent<any>> =>
          currentMockEndpoint
            ? currentMockEndpoint.handler(endpoint?.params, request.body ?? request.params, request.headers)
            : next.handle(request)
      )
    );
  }

  private _getEndpoint(request: HttpRequest<any>): { params: string[]; path: string } | null {
    let res: { params: string[] | null; path: string } | null = null;

    Object.keys(this.endpoints?.[request.method as keyof IMockEndpoints] ?? {}).forEach((path: string): void => {
      const params: string[] | null = this._findDiff(path, request.url);
      let updatedPath: string = path;

      if (path === request.url) {
        res = { params: null, path };
      }

      params.forEach((param: string): string => (updatedPath = updatedPath.replace(/:[a-z]+(?=\/)?/gi, param)));

      if (updatedPath === request.url) {
        res = { params, path };
      }
    });

    return res;
  }

  private _findDiff(str1: string, str2: string): string[] {
    const diff: string[] = [];

    str2.split('/').forEach((val: string, i: number): void => {
      if (val !== str1.split('/')[i]) {
        diff.push(val);
      }
    });

    return diff;
  }
}
