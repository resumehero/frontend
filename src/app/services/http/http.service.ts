import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoaderService, LoaderType } from '@services/loader/loader.service';
import { HttpServiceError, IErrorDescription } from '@services/http/http-service-error.class';
import { ToastrService } from 'ngx-toastr';
import { IHttpRequestOptions } from '@models/interfaces/http-request-options.interface';
import { APP_CONFIG, IAppConfig } from '@misc/constants/app-config.constant';

export interface IServicesConfig {
  skipErrorNotification?: ((err: HttpServiceError) => boolean) | boolean;
  showSuccessNotification?: { text: string };
  loaderType?: LoaderType;
  skipLoaderStart?: boolean;
  skipLoaderEnd?: boolean;
  skipCaching?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient {
  private _notification: ToastrService = inject(ToastrService);
  private _loader: LoaderService = inject(LoaderService);
  private _config: IAppConfig = inject<IAppConfig>(APP_CONFIG);
  private _apiVersion: string = 'v1';

  get apiUrl(): string {
    return `${this._config.apiUrl}/api/${this._apiVersion}`;
  }

  override get(url: string, options?: IHttpRequestOptions, services?: IServicesConfig | undefined): Observable<any> {
    this.startLoader(services);

    return super
      .get(this.apiUrl + url, options as IHttpRequestOptions)
      .pipe(
        tap(this._onSuccess.bind(this, services)),
        catchError(this._onError.bind(this, services)),
        finalize(this._onEveryCase.bind(this, services))
      );
  }

  override post(url: string, body: any | null, options?: IHttpRequestOptions, services?: IServicesConfig | undefined): Observable<any> {
    this.startLoader(services);

    return super
      .post(this.apiUrl + url, body, options)
      .pipe(
        tap(this._onSuccess.bind(this, services)),
        catchError(this._onError.bind(this, services)),
        finalize(this._onEveryCase.bind(this, services))
      );
  }

  override patch(url: string, body: any | null, options?: IHttpRequestOptions, services?: IServicesConfig | undefined): Observable<any> {
    this.startLoader(services);
    return super
      .patch(this.apiUrl + url, body, options)
      .pipe(
        tap(this._onSuccess.bind(this, services)),
        catchError(this._onError.bind(this, services)),
        finalize(this._onEveryCase.bind(this, services))
      );
  }

  override delete(url: string, options?: IHttpRequestOptions, services?: IServicesConfig | undefined): Observable<any> {
    this.startLoader(services);

    return super
      .delete(this.apiUrl + url, options)
      .pipe(
        tap(this._onSuccess.bind(this, services)),
        catchError(this._onError.bind(this, services)),
        finalize(this._onEveryCase.bind(this, services))
      );
  }

  override put(url: string, body: any | null, options?: IHttpRequestOptions, services?: IServicesConfig | undefined): Observable<any> {
    this.startLoader(services);

    return super
      .put(this.apiUrl + url, body, options)
      .pipe(
        tap(this._onSuccess.bind(this, services)),
        catchError(this._onError.bind(this, services)),
        finalize(this._onEveryCase.bind(this, services))
      );
  }

  startLoader(config: IServicesConfig | undefined): void {
    if (!config || (config && !config.skipLoaderStart)) {
      this._loader.on(config?.loaderType ?? 'spinner');
    }
  }

  endLoader(config: IServicesConfig | undefined): void {
    if (!config || (config && !config.skipLoaderEnd)) {
      this._loader.off(config?.loaderType ?? 'spinner');
    }
  }

  private _onSuccess(config: IServicesConfig | undefined): void {
    if (config?.showSuccessNotification) {
      this._notification.success(config?.showSuccessNotification?.text ?? 'Request successfully sent!');
    }
  }

  private _onError(config: IServicesConfig | undefined, error: HttpErrorResponse): Observable<HttpServiceError> {
    const customError: HttpServiceError = new HttpServiceError(error);

    if (
      !config ||
      !(typeof config.skipErrorNotification === 'boolean' ? config.skipErrorNotification : config.skipErrorNotification?.(customError))
    ) {
      customError.descriptions.forEach(({ key, message }: IErrorDescription): void => {
        this._notification.error(message);
      });
    }

    throw customError;
  }

  private _onEveryCase(config: IServicesConfig | undefined): void {
    this.endLoader(config);
  }
}
