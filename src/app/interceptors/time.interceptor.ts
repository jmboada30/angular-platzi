import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Cuando necesitemos que los interceptores solo se ejecuten para ciertas peticiones debemos usar un context...
 * El cual usaremos en los peticiones de los servicios que si queremos que usen el interceptor.
 */
const CHECK_TOKEN = new HttpContextToken<boolean>(() => false); //<- estamos diciendo que por defecto ignore este interceptor.

export function checkTime() {
  return new HttpContext().set(CHECK_TOKEN, true);
}
// hasta aqui el context

@Injectable()
export class TimeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.context.get(CHECK_TOKEN)) return next.handle(request);

    const start = performance.now();

    return next.handle(request).pipe(
      tap(() => {
        const time = performance.now() - start + 'ms';
        console.log(request.url, time);
      })
    );
  }
}
