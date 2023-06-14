import { HttpErrorResponse } from '@angular/common/http';

export interface IErrorDescription {
  message: string;
  key: string;
}

export class HttpServiceError extends HttpErrorResponse {
  get descriptions(): IErrorDescription[] {
    return this._isFormError ? this._getFormFieldsErrorDescriptions(this) : [this._getSimpleErrorMessage()];
  }

  private get _isFormError(): boolean {
    return typeof this.error === 'object' && this.error !== null;
  }

  constructor(e: HttpErrorResponse) {
    super(e as any);
  }

  private _getSimpleErrorMessage(): IErrorDescription {
    let message: string = `${this.status}: ${this.statusText}`;
    let key: string | undefined;

    if (this.error) {
      if (this.error.message) {
        message = this.error.message;
      }

      if (this.error.detail) {
        message = this.error.detail;
      }

      key = this.error.error;
    }

    message = message || 'Something went wrong';

    return { key: null, message };
  }

  private _getFormFieldsErrorDescriptions(error: HttpErrorResponse): IErrorDescription[] {
    const mainErrors: string[] = Object.keys(error.error);
    const result: IErrorDescription[] = [];

    if (mainErrors) {
      mainErrors.forEach((field: string): void => {
        result.push({ key: field, message: error.error[field] });
      });
    }

    return result;
  }
}
