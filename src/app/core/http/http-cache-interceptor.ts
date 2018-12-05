// angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

// 3rd party
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

// services
import { HttpCacheService } from './http-cache.service';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(
    private cacheService: HttpCacheService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // non-cachable requests
    if (req.method !== 'GET') {
      // sanity check
      console.log(`Invalidate cache:${req.method} -> ${req.url}`);
      this.cacheService.invalidateCache();
      return next.handle(req);
    }
    // retrive cached response
    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);
    // return cached response
    if (cachedResponse) {
      console.log(`Using cached response: ${cachedResponse.url}`);
      console.dir(cachedResponse);
      // cast to Observable
      return of(cachedResponse);
    }
    // send remaining requests to server
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(`Add item to cache: ${req.url}`);
            this.cacheService.put(req.url, event);
          }
        })
      );
  }
}
