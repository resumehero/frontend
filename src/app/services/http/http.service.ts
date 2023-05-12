import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoaderService, LoaderType } from '@services/loader/loader.service';
import { IErrorDescription, HttpServiceError } from '@services/http/http-service-error.class';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IHttpRequestOptions } from '@models/interfaces/http-request-options.interface';

export interface IServicesConfig {
  skipErrorNotification?: ((err: HttpServiceError) => boolean) | boolean;
  showSuccessNotification?: { text: string };
  loaderType?: LoaderType;
  skipLoaderStart?: boolean;
  skipLoaderEnd?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient {
  private _notification: ToastrService = inject(ToastrService);
  private _loader: LoaderService = inject(LoaderService);
  private _translate: TranslateService = inject(TranslateService);

  override get(url: string, options?: IHttpRequestOptions, services?: IServicesConfig | undefined): Observable<any> {
    this._startLoader(services);
    const httpOptions: IHttpRequestOptions = {
      headers: new HttpHeaders({
        Accept: 'application/ld+json'
      })
    };

    return super
      .get(url, { ...httpOptions, ...options } as IHttpRequestOptions)
      .pipe(
        tap(this._onSuccess.bind(this, services)),
        catchError(this._onError.bind(this, services)),
        finalize(this._onEveryCase.bind(this, services))
      );
  }

  override post(url: string, body: any | null, options?: IHttpRequestOptions, services?: IServicesConfig | undefined): Observable<any> {
    this._startLoader(services);

    return super
      .post(url, body, options)
      .pipe(
        tap(this._onSuccess.bind(this, services)),
        catchError(this._onError.bind(this, services)),
        finalize(this._onEveryCase.bind(this, services))
      );
  }

  override patch(url: string, body: any | null, options?: IHttpRequestOptions, services?: IServicesConfig | undefined): Observable<any> {
    this._startLoader(services);
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/merge-patch+json'
      })
    };
    return super
      .patch(url, body, { ...httpOptions, ...options })
      .pipe(
        tap(this._onSuccess.bind(this, services)),
        catchError(this._onError.bind(this, services)),
        finalize(this._onEveryCase.bind(this, services))
      );
  }

  override delete(url: string, options?: IHttpRequestOptions, services?: IServicesConfig | undefined): Observable<any> {
    this._startLoader(services);

    return super
      .delete(url, options)
      .pipe(
        tap(this._onSuccess.bind(this, services)),
        catchError(this._onError.bind(this, services)),
        finalize(this._onEveryCase.bind(this, services))
      );
  }

  override put(url: string, body: any | null, options?: IHttpRequestOptions, services?: IServicesConfig | undefined): Observable<any> {
    this._startLoader(services);

    return super
      .put(url, body, options)
      .pipe(
        tap(this._onSuccess.bind(this, services)),
        catchError(this._onError.bind(this, services)),
        finalize(this._onEveryCase.bind(this, services))
      );
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
        const notificationMessage: string = key ? this._translate.instant(`BACKEND_ERRORS.${key.toUpperCase()}`) : message;

        this._notification.error(notificationMessage);
      });
    }

    throw customError;
  }

  private _onEveryCase(config: IServicesConfig | undefined): void {
    this._endLoader(config);
  }

  private _startLoader(config: IServicesConfig | undefined): void {
    if (!config || (config && !config.skipLoaderStart)) {
      this._loader.on(config?.loaderType ?? 'spinner');
    }
  }

  private _endLoader(config: IServicesConfig | undefined): void {
    if (!config || (config && !config.skipLoaderEnd)) {
      this._loader.off(config?.loaderType ?? 'spinner');
    }
  }
}
