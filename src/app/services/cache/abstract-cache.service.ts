import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

interface ICacheItem<Val> {
  createdAt: number;
  value: Val;
}

export interface ICacheExtras {
  ignoreCache?: boolean;
}

@Injectable()
export abstract class AbstractCacheService {
  protected readonly _CACHE_LIFETIME_MINUTES: number = 120;
  private readonly _CACHE: Map<string, ICacheItem<any>> = new Map();

  cacheRequest<Val>(key: unknown, req: Observable<Val>, extras?: ICacheExtras): Observable<Val> {
    const cachedValue: Val = this.getCacheValue<Val>(key);
    const request$: Observable<Val> = req.pipe(tap(value => this.setCacheValue<Val>(key, value)));

    if (extras?.ignoreCache) {
      return request$;
    }

    if (cachedValue) {
      return of(cachedValue);
    }

    return request$;
  }

  getCacheValue<Val>(key: unknown): Val | null {
    let item: ICacheItem<Val> = this._CACHE.get(this._getKey(key));

    if (!item) {
      return null;
    }

    const timeOffsetMinutes: number = this._getCurrentTime() - item.createdAt;

    if (timeOffsetMinutes > this._CACHE_LIFETIME_MINUTES) {
      this.clearCacheValue(key);
      return null;
    }

    return item.value ?? null;
  }

  setCacheValue<Val>(key: unknown, value: Val): void {
    this._CACHE.set(this._getKey(key), { value, createdAt: this._getCurrentTime() });
  }

  clearCacheValue(key: unknown): void {
    this._CACHE.delete(this._getKey(key));
  }

  clearEntireCache(): void {
    this._CACHE.clear();
  }

  private _getKey(key: unknown): string {
    return JSON.stringify(key);
  }

  private _getCurrentTime(): number {
    return new Date().getTime() / 1000 / 60;
  }
}
