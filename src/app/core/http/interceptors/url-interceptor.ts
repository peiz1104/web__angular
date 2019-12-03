import { Injectable } from '@angular/core';
import { HttpInterceptor } from './http-interceptor';
import { RequestParams } from './request-params';
import { Observable } from 'rxjs/Observable';
import { Request } from '@angular/http';

@Injectable()
export class UrlIntorceptor implements HttpInterceptor {
    beforeRquest(requestParams: RequestParams): Observable<RequestParams> | RequestParams {
        if (requestParams.url instanceof Request) {
            let url = requestParams.url.url;
            if (!url.startsWith('http')) {
                url = url.startsWith('/') ? url : `/${url}`;
                url = `http://localhost:8085${url}`;
                requestParams.url.url = url;
            }
        } else {
            let url = requestParams.url;
            if (!url.startsWith('http')) {
                url = url.startsWith('/') ? url : `/${url}`;
                url = `http://localhost:8085${url}`;
                requestParams.url = url;
            }
        }
        return requestParams;
    }
}
