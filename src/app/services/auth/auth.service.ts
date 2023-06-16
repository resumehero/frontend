import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpRequest } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { Token } from '@models/classes/tokens.model';
import { User } from '@models/classes/user/user.model';
import { UserRole } from '@models/enums/user-role.enum';
import { HttpService, IServicesConfig } from '@services/http/http.service';
import { StorageService } from '@services/storage/storage.service';
import { plainToClass } from 'class-transformer';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { StorageKey } from '@models/enums/storage-key.enum';
import { ILoginParams } from '@models/interfaces/login-params.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  me$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private _http: HttpService = inject(HttpService);
  private _storage: StorageService = inject(StorageService);
  private _userApi: UserApiService = inject(UserApiService);

  get isAuthenticated(): boolean {
    return Boolean(this.myRole && this.token?.access);
  }

  get token(): Token | null {
    return this._storage.get<Token>(StorageKey.tokens);
  }

  get myRole(): UserRole | null {
    return this._storage.get<UserRole>(StorageKey.role);
  }

  get me(): User | null {
    return this.me$.value;
  }

  login({ username: email, password, code }: ILoginParams, shouldRemember: boolean, services?: IServicesConfig): Observable<User> {
    this._storage.shouldUseLocalstorage = shouldRemember;

    return this._http.post(`/auth/jwt/create`, { email, password }, {}, services).pipe(
      map(this._onTokenResponse.bind(this)),
      switchMap(() => this.getMe())
    );
  }

  refreshToken(): Observable<any> {
    return this._http.post(`/auth/jwt/refresh`, { refresh: this.token.refresh }, {}, {}).pipe(
      map(this._onTokenResponse.bind(this)),
      switchMap(() => this.getMe())
    );
  }

  logout(): Observable<void> {
    return of(this.clearTokens());
  }

  clearTokens(): void {
    this._storage.clear();
    this.me$.next(null);
  }

  addTokenToRequest(req: HttpRequest<any>): HttpRequest<any> {
    return this.token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.token.access}`
          }
        })
      : req;
  }

  setRole(role: UserRole): UserRole {
    this._storage.set(StorageKey.role, role);
    return role;
  }

  getMe(skipLoaderStart?: boolean): Observable<User> {
    return this._userApi.getMe({ skipLoaderStart, skipErrorNotification: true }).pipe(
      map((user: User): User => {
        this.me$.next(user);
        this.setRole(user.role);
        return user;
      })
    );
  }

  markTokensAsRevoked(): void {
    const token: Token = this._storage.get<Token>(StorageKey.tokens) || ({} as Token);
    token.isRevoked = true;
    this._storage.set(StorageKey.tokens, token);
  }

  private _onTokenResponse(res: Token): Token | undefined {
    let tokens: Token | undefined;

    if (res.access) {
      tokens = plainToClass(Token, res);
      this._storage.set(StorageKey.tokens, tokens);
    }

    return tokens;
  }
}
