import { Injectable } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { RequestParams } from './request-params';
import { Observable } from 'rxjs/Observable';
import { Request, Headers } from '@angular/http';

@Injectable()
export class NoCacheIntorceptor implements HttpInterceptor {
    beforeRquest(requestParams: RequestParams): Observable<RequestParams> | RequestParams {
        if (requestParams.url instanceof Request) {
            let headers: Headers = requestParams.url.headers;
            requestParams.url.headers = this.appendNoCache(headers);
        } else {
            if (requestParams && requestParams.options) {
                let headers: Headers = requestParams.options.headers;
                requestParams.options.headers = this.appendNoCache(headers);
            } else {
                requestParams.options = {headers: this.appendNoCache()};
            }
        }
        return requestParams;
    }

    appendNoCache(headers?: Headers) {
        if (!headers) {
            headers = new Headers();
        }
        if (!headers.get('Cache-Control')) {
            headers.set('Cache-Control', 'no-cache');
        }
        if (!headers.get('Pragma')) {
            headers.set('Pragma', 'no-cache');
        }

        return headers;
    }
}
